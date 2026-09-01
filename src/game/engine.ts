import { CharacterProfile, CharacterType, Particle, PlayerStats, PowerupType, TileMap } from '../types/game';
import { CHARACTERS, getRoleEventKeyForDay } from '../data/gameData';
import { sound } from '../audio/soundEngine';
import { TILE_SIZE, getLevelByIndex, createUndergroundSubway, createTropicalVacationIsland } from './levels';

export interface GameInputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  jumpPressed: boolean; // Just pressed this frame
  dash: boolean;
}

export interface ActiveEntity {
  id: string;
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  grounded: boolean;
  dead: boolean;
  stateTimer: number;
  properties?: Record<string, any>;
}

export class PlatformerEngine {
  public player = {
    x: 64,
    y: 350,
    vx: 0,
    vy: 0,
    width: 24,
    height: 30,
    grounded: false,
    facing: 'right' as 'left' | 'right',
    animFrame: 0,
    isInvincible: false,
    invincibleTimer: 0,
    crouching: false,
    canDoubleJump: false,
    hasDoubleJumped: false,
    slidingFlag: false,
    flagPoleX: 0,
    flagPoleY: 0,
  };

  public currentLevel: TileMap;
  public levelIndex: number = 0;
  public inSecretLevel: boolean = false;
  public secretLevelReturnLevel: number = 0;
  public cameraX: number = 0;
  public cameraY: number = 0;
  public gameTime: number = 0;

  public entities: ActiveEntity[] = [];
  public particles: Particle[] = [];

  public onTriggerLifeEvent?: (eventId: string) => void;
  public onDayCompleted?: () => void;
  public onGameOver?: (reason: string) => void;
  public onStatUpdate?: (stats: Partial<PlayerStats>) => void;

  public stats: PlayerStats;
  public character: CharacterType;

  constructor(stats: PlayerStats, character: CharacterType) {
    this.stats = stats;
    this.character = character;
    this.currentLevel = getLevelByIndex(this.stats.dayIndex, this.character);
    this.loadLevel(this.currentLevel);
  }

  public loadLevel(level: TileMap, spawnX: number = 64, spawnY: number = 350) {
    this.currentLevel = JSON.parse(JSON.stringify(level)); // Deep clone to preserve state per run
    this.player.x = spawnX;
    this.player.y = spawnY;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.grounded = false;
    this.player.slidingFlag = false;
    this.cameraX = 0;
    this.cameraY = 0;

    // Instantiate entities
    this.entities = (this.currentLevel.entities || []).map((e, idx) => ({
      id: `ent_${idx}_${e.type}`,
      type: e.type,
      x: e.x,
      y: e.y,
      vx: e.type === 'bug_enemy' || e.type === 'distraction_cat' || e.type === 'laundry_monster' ? -1.0 : 0,
      vy: 0,
      width: 28,
      height: 28,
      grounded: true,
      dead: false,
      stateTimer: 0,
      properties: e.properties,
    }));
  }

  public updateStats(newStats: PlayerStats) {
    this.stats = newStats;
  }

  // Primary Game Physics & Interaction Loop
  public update(dt: number, input: GameInputState) {
    this.gameTime += dt;

    // Handle Active Power-up timer countdown
    if (this.stats.activePowerup) {
      this.stats.powerupTimer -= dt;
      if (this.stats.powerupTimer <= 0) {
        this.stats.activePowerup = null;
        this.onStatUpdate?.({ activePowerup: null, powerupTimer: 0 });
      }
    }

    // Handle Invincibility flash timer
    if (this.player.isInvincible) {
      this.player.invincibleTimer -= dt;
      if (this.player.invincibleTimer <= 0) {
        this.player.isInvincible = false;
      }
    }

    // Passive Energy Burnout drain (work hours require physical stamina)
    const charProfile = CHARACTERS.find((c) => c.id === this.character) || CHARACTERS[0];
    const drainMultiplier = charProfile?.energyDrainRate || 1.0;
    this.stats.energy = Math.max(0, this.stats.energy - dt * 0.4 * drainMultiplier);
    if (this.stats.energy <= 0) {
      // Energy depleted causes work fatigue slowdown
      this.stats.morale = Math.max(0, this.stats.morale - dt * 1.5);
    }
    this.onStatUpdate?.({ energy: this.stats.energy, morale: this.stats.morale });

    // If sliding down flagpole
    if (this.player.slidingFlag) {
      this.player.y += 150 * dt;
      if (this.player.y >= this.player.flagPoleY - 16) {
        this.player.slidingFlag = false;
        sound.playLevelClear();
        setTimeout(() => {
          this.onDayCompleted?.();
        }, 1200);
      }
      this.updateParticles(dt);
      return;
    }

    // --- Player Movement Physics with Designer Multipliers ---
    const speedMult = charProfile?.speedMultiplier || 1.0;
    const jumpMult = charProfile?.jumpMultiplier || 1.0;

    const isEspresso = this.stats.activePowerup === 'espresso';
    const baseSpeed = 220 * speedMult * (isEspresso ? 1.5 : 1.0);
    const accel = 900;
    const friction = 750;
    const gravity = 1100;
    const jumpStrength = -460 * jumpMult * (isEspresso ? 1.25 : 1.0);

    // Left / Right Movement
    if (input.left) {
      this.player.vx = Math.max(-baseSpeed, this.player.vx - accel * dt);
      this.player.facing = 'left';
      this.player.animFrame += dt * 15;
    } else if (input.right) {
      this.player.vx = Math.min(baseSpeed, this.player.vx + accel * dt);
      this.player.facing = 'right';
      this.player.animFrame += dt * 15;
    } else {
      // Decelerate / Friction
      if (this.player.vx > 0) {
        this.player.vx = Math.max(0, this.player.vx - friction * dt);
      } else if (this.player.vx < 0) {
        this.player.vx = Math.min(0, this.player.vx + friction * dt);
      }
    }

    // Jumping Logic
    if (input.jumpPressed) {
      if (this.player.grounded) {
        this.player.vy = jumpStrength;
        this.player.grounded = false;
        this.player.hasDoubleJumped = false;
        sound.playJump();
      } else if (isEspresso && !this.player.hasDoubleJumped) {
        // Double Jump with Espresso
        this.player.vy = jumpStrength * 0.9;
        this.player.hasDoubleJumped = true;
        sound.playJump();
        this.spawnCoffeeParticles(this.player.x + 12, this.player.y + 24);
      }
    }

    // Variable jump height (releasing jump early reduces upwards velocity)
    if (!input.jump && this.player.vy < -150) {
      this.player.vy += 600 * dt;
    }

    // Apply gravity
    this.player.vy += gravity * dt;
    if (this.player.vy > 650) {
      this.player.vy = 650;
    }

    // Move Player X and check tile collisions
    this.player.x += this.player.vx * dt;
    this.checkTileCollisionsX();

    // Move Player Y and check tile collisions
    this.player.y += this.player.vy * dt;
    this.player.grounded = false;
    this.checkTileCollisionsY(input);

    // Pit fall check
    if (this.player.y > (this.currentLevel.height + 2) * TILE_SIZE) {
      this.handlePlayerDeath('Fell into Sprint Blocker Pit');
      return;
    }

    // Camera following player with smooth lead
    const targetCameraX = Math.max(0, Math.min(this.player.x - 300, this.currentLevel.width * TILE_SIZE - 750));
    this.cameraX += (targetCameraX - this.cameraX) * 0.1;

    // --- Update Entities ---
    this.updateEntities(dt);

    // --- Update Particles ---
    this.updateParticles(dt);
  }

  // Horizontal Tile Collision & Boundaries
  private checkTileCollisionsX() {
    const tiles = this.currentLevel.tiles;
    const startX = Math.max(0, Math.floor(this.player.x / TILE_SIZE));
    const endX = Math.min(this.currentLevel.width - 1, Math.floor((this.player.x + this.player.width) / TILE_SIZE));
    const startY = Math.max(0, Math.floor(this.player.y / TILE_SIZE));
    const endY = Math.min(this.currentLevel.height - 1, Math.floor((this.player.y + this.player.height) / TILE_SIZE));

    for (let r = startY; r <= endY; r++) {
      for (let c = startX; c <= endX; c++) {
        const tile = tiles[r][c];
        if (this.isSolidTile(tile)) {
          if (this.player.vx > 0) {
            this.player.x = c * TILE_SIZE - this.player.width - 0.01;
            this.player.vx = 0;
          } else if (this.player.vx < 0) {
            this.player.x = (c + 1) * TILE_SIZE + 0.01;
            this.player.vx = 0;
          }
        }
      }
    }
  }

  // Vertical Tile Collision (Landing & Head Bumping & Warp Pipes)
  private checkTileCollisionsY(input: GameInputState) {
    const tiles = this.currentLevel.tiles;
    const startX = Math.max(0, Math.floor(this.player.x / TILE_SIZE));
    const endX = Math.min(this.currentLevel.width - 1, Math.floor((this.player.x + this.player.width) / TILE_SIZE));
    const startY = Math.max(0, Math.floor(this.player.y / TILE_SIZE));
    const endY = Math.min(this.currentLevel.height - 1, Math.floor((this.player.y + this.player.height) / TILE_SIZE));

    for (let r = startY; r <= endY; r++) {
      for (let c = startX; c <= endX; c++) {
        const tile = tiles[r][c];

        // Flagpole victory trigger
        if (tile === 9 || tile === 10 || tile === 11) {
          if (this.player.vx > 0 || this.player.x + this.player.width >= c * TILE_SIZE) {
            this.triggerFlagpoleSequence(c, r);
            return;
          }
        }

        // Warp Pipe Check (Press DOWN on warp pipe top: tiles 13 or 14)
        if ((tile === 13 || tile === 14) && input.down && this.player.vy >= 0) {
          this.handleWarpPipe(c, r);
          return;
        }

        if (this.isSolidTile(tile)) {
          if (this.player.vy > 0) {
            // Landing on top of tile
            this.player.y = r * TILE_SIZE - this.player.height - 0.01;
            this.player.vy = 0;
            this.player.grounded = true;
          } else if (this.player.vy < 0) {
            // Head Bump into block from below!
            this.player.y = (r + 1) * TILE_SIZE + 0.01;
            this.player.vy = 0;
            this.handleBlockBump(c, r, tile);
          }
        }
      }
    }
  }

  private isSolidTile(tile: number): boolean {
    // 0: Air, 4: Hidden (unless bumped), 9: Flagpole top (passable), 10: pole, 11: base
    return (
      tile === 1 || // Ground
      tile === 2 || // Brick
      tile === 3 || // Question block
      tile === 5 || // Pipe top left
      tile === 6 || // Pipe top right
      tile === 7 || // Pipe body left
      tile === 8 || // Pipe body right
      tile === 12 || // Event block
      tile === 13 || // Warp pipe top left
      tile === 14 || // Warp pipe top right
      tile === 15 // Coffee dispenser
    );
  }

  // Handle Bumping Block from Below (Question Box, Brick, Hidden)
  private handleBlockBump(col: number, row: number, tile: number) {
    sound.playBlockBump();

    if (tile === 3) {
      // Question Block -> Dispense Hour Token or Coffee!
      this.currentLevel.tiles[row][col] = 1; // Turn into inert brick
      
      // Randomly spawn Hour Token or Espresso
      const isCoffee = Math.random() > 0.6;
      if (isCoffee) {
        this.spawnPowerup(col * TILE_SIZE, (row - 1) * TILE_SIZE, 'coffee_cup');
      } else {
        this.collectHourToken(col * TILE_SIZE + 16, (row - 1) * TILE_SIZE, 1.0);
      }
    } else if (tile === 15) {
      // Coffee Dispenser
      this.currentLevel.tiles[row][col] = 1;
      this.spawnPowerup(col * TILE_SIZE, (row - 1) * TILE_SIZE, 'coffee_cup');
    } else if (tile === 12) {
      // Event Block triggered by head bump!
      const eventKey = this.getEventKeyForLevel(this.stats.dayIndex);
      this.onTriggerLifeEvent?.(eventKey);
    }
  }

  // Warp pipe entrance
  private handleWarpPipe(col: number, row: number) {
    sound.playPipeWarp();
    if (!this.inSecretLevel) {
      this.inSecretLevel = true;
      this.secretLevelReturnLevel = this.stats.dayIndex;
      this.stats.hiddenZonesFound += 1;
      this.onStatUpdate?.({ hiddenZonesFound: this.stats.hiddenZonesFound });

      // Alternate secret level based on day
      if (this.stats.dayIndex === 3) {
        this.loadLevel(createTropicalVacationIsland(), 64, 300);
      } else {
        this.loadLevel(createUndergroundSubway(), 64, 300);
      }
    } else {
      // Exit secret level back to main day sprint
      this.inSecretLevel = false;
      const mainLevel = getLevelByIndex(this.secretLevelReturnLevel, this.character);
      this.loadLevel(mainLevel, 24 * TILE_SIZE, 300);
    }
  }

  private triggerFlagpoleSequence(col: number, row: number) {
    this.player.slidingFlag = true;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.flagPoleX = col * TILE_SIZE;
    this.player.flagPoleY = 12 * TILE_SIZE;
    this.player.x = col * TILE_SIZE - 4;

    // Bonus sprint completion hours for finishing day
    const completionBonus = 3.0;
    this.collectHourToken(this.player.x, this.player.y - 20, completionBonus);
  }

  // Update Non-Player Entities (Enemies, Powerups, Coins)
  private updateEntities(dt: number) {
    const playerRect = {
      x: this.player.x,
      y: this.player.y,
      width: this.player.width,
      height: this.player.height,
    };

    this.entities.forEach((entity) => {
      if (entity.dead) return;

      // Enemy Patrol Movement
      if (entity.type === 'bug_enemy' || entity.type === 'distraction_cat' || entity.type === 'laundry_monster') {
        entity.x += entity.vx * 60 * dt;
        entity.stateTimer += dt;

        // Bounce back and forth
        if (entity.stateTimer > 3.0) {
          entity.vx *= -1;
          entity.stateTimer = 0;
        }
      }

      // Check collision with Player
      const entityRect = {
        x: entity.x,
        y: entity.y,
        width: entity.width,
        height: entity.height,
      };

      if (this.checkAABB(playerRect, entityRect)) {
        this.handlePlayerEntityCollision(entity);
      }
    });
  }

  private handlePlayerEntityCollision(entity: ActiveEntity) {
    // 1. Hour Token pickup
    if (entity.type === 'hour_token') {
      entity.dead = true;
      this.collectHourToken(entity.x, entity.y, 1.0);
      return;
    }

    // 2. Coffee Cup power-up
    if (entity.type === 'coffee_cup') {
      entity.dead = true;
      sound.playPowerup();
      this.stats.activePowerup = 'espresso';
      this.stats.powerupTimer = 18; // 18 seconds of espresso rush
      this.stats.energy = Math.min(100, this.stats.energy + 35);
      this.onStatUpdate?.({
        activePowerup: 'espresso',
        powerupTimer: 18,
        energy: this.stats.energy,
      });
      this.spawnFloatingText(entity.x, entity.y, '☕ ESPRESSO RUSH! 2X SPEED', '#f59e0b');
      return;
    }

    // 3. Focus Goggles power-up
    if (entity.type === 'goggles_item') {
      entity.dead = true;
      sound.playPowerup();
      this.stats.activePowerup = 'focus_goggles';
      this.stats.powerupTimer = 25;
      this.onStatUpdate?.({
        activePowerup: 'focus_goggles',
        powerupTimer: 25,
      });
      this.spawnFloatingText(entity.x, entity.y, '👓 FOCUS GOGGLES! SECRETS REVEALED', '#06b6d4');
      return;
    }

    // 4. Shield Star power-up
    if (entity.type === 'shield_star') {
      entity.dead = true;
      sound.playPowerup();
      this.stats.activePowerup = 'delegation_shield';
      this.stats.powerupTimer = 15;
      this.onStatUpdate?.({
        activePowerup: 'delegation_shield',
        powerupTimer: 15,
      });
      this.spawnFloatingText(entity.x, entity.y, '🛡️ DELEGATION SHIELD! INVINCIBLE', '#eab308');
      return;
    }

    // 5. Snack / Healthy Meal
    if (entity.type === 'snack') {
      entity.dead = true;
      sound.playPowerup();
      this.stats.energy = 100;
      this.stats.morale = Math.min(100, this.stats.morale + 15);
      this.onStatUpdate?.({
        energy: 100,
        morale: this.stats.morale,
      });
      this.spawnFloatingText(entity.x, entity.y, '🍎 HEALTHY SNACK! 100% ENERGY', '#22c55e');
      return;
    }

    // 6. Life Event Beacon Node
    if (entity.type === 'life_event_node') {
      entity.dead = true;
      const eventId = entity.properties?.eventId || 'missing_info';
      this.onTriggerLifeEvent?.(eventId);
      return;
    }

    // 7. Enemy Collision (Stomping vs Getting Hit)
    const isDelegationShield = this.stats.activePowerup === 'delegation_shield';
    const isStomp = this.player.vy > 0 && this.player.y + this.player.height - 10 <= entity.y + 12;

    if (isStomp || isDelegationShield) {
      // Stomp Bug enemy!
      entity.dead = true;
      this.player.vy = -380; // Stomp bounce
      sound.playStomp();
      this.stats.score += 200;
      this.stats.morale = Math.min(100, this.stats.morale + 5);
      this.onStatUpdate?.({ score: this.stats.score, morale: this.stats.morale });
      this.spawnFloatingText(entity.x, entity.y, '+200 BUG RESOLVED!', '#4ade80');
      this.spawnStompParticles(entity.x + 14, entity.y + 14);
    } else if (!this.player.isInvincible) {
      // Player takes damage / distraction hit
      this.handlePlayerHit(entity.type);
    }
  }

  private handlePlayerHit(enemyType: string) {
    sound.playHit();
    this.player.isInvincible = true;
    this.player.invincibleTimer = 2.0; // 2 seconds mercy invincibility
    this.player.vy = -280;
    this.player.vx = this.player.facing === 'right' ? -180 : 180;

    // Distraction / Obstacle Penalty
    this.stats.morale = Math.max(0, this.stats.morale - 15);
    this.stats.taskQuality = Math.max(10, this.stats.taskQuality - 5);
    this.onStatUpdate?.({
      morale: this.stats.morale,
      taskQuality: this.stats.taskQuality,
    });

    this.spawnFloatingText(this.player.x, this.player.y - 10, 'DISTRACTION HIT! -5% QUALITY', '#ef4444');
  }

  private handlePlayerDeath(reason: string) {
    sound.playHit();
    this.stats.lives -= 1;
    this.onStatUpdate?.({ lives: this.stats.lives });

    if (this.stats.lives <= 0) {
      this.onGameOver?.(reason);
    } else {
      // Respawn at beginning of level
      this.loadLevel(this.currentLevel);
      this.spawnFloatingText(64, 300, `SICK DAY USED! (${this.stats.lives} REMAINING)`, '#f97316');
    }
  }

  public collectHourToken(x: number, y: number, amount: number = 1.0) {
    sound.playHourToken();
    const isOvertimeRate = this.stats.activePowerup === 'time_buffer' ? 1.5 : 1.0;
    const addedHours = amount * isOvertimeRate;
    
    this.stats.hoursLogged = Math.min(this.stats.targetHours, +(this.stats.hoursLogged + addedHours).toFixed(1));
    this.stats.score += Math.round(addedHours * 500);
    this.onStatUpdate?.({
      hoursLogged: this.stats.hoursLogged,
      score: this.stats.score,
    });

    this.spawnFloatingText(x, y, `+${addedHours.toFixed(1)}h WORK LOGGED!`, '#eab308');
    this.spawnHourCoinParticles(x, y);
  }

  private spawnPowerup(x: number, y: number, type: string) {
    sound.playPowerup();
    this.entities.push({
      id: `powerup_${Date.now()}`,
      type,
      x,
      y,
      vx: 0,
      vy: 0,
      width: 28,
      height: 28,
      grounded: true,
      dead: false,
      stateTimer: 0,
    });
  }

  private spawnFloatingText(x: number, y: number, text: string, color: string) {
    this.particles.push({
      x,
      y,
      vx: 0,
      vy: -40,
      color,
      size: 10,
      life: 1.5,
      maxLife: 1.5,
      text,
    });
  }

  private spawnStompParticles(x: number, y: number) {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * 120,
        vy: Math.sin(angle) * 120,
        color: '#16a34a',
        size: 4,
        life: 0.5,
        maxLife: 0.5,
      });
    }
  }

  private spawnCoffeeParticles(x: number, y: number) {
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 60,
        vy: -80 - Math.random() * 40,
        color: '#d97706',
        size: 5,
        life: 0.6,
        maxLife: 0.6,
      });
    }
  }

  private spawnHourCoinParticles(x: number, y: number) {
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 140,
        vy: -100 - Math.random() * 80,
        color: '#facc15',
        size: 4,
        life: 0.8,
        maxLife: 0.8,
      });
    }
  }

  private updateParticles(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  private checkAABB(
    r1: { x: number; y: number; width: number; height: number },
    r2: { x: number; y: number; width: number; height: number }
  ): boolean {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    );
  }

  private getEventKeyForLevel(dayIdx: number): string {
    return getRoleEventKeyForDay(dayIdx, this.character);
  }
}
