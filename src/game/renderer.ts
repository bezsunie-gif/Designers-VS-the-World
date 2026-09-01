import { CharacterType, Particle, PowerupType, TileMap } from '../types/game';
import { TILE_SIZE } from './levels';

export class GameRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public clear(width: number, height: number) {
    this.ctx.clearRect(0, 0, width, height);
  }

  // Draw Dynamic Sky & Background with parallax
  public drawBackground(
    theme: TileMap['theme'],
    cameraX: number,
    viewWidth: number,
    viewHeight: number,
    gameTime: number
  ) {
    const ctx = this.ctx;

    if (theme === 'office') {
      // Iconic Mario Vibrant Blue Sky
      ctx.fillStyle = '#5C94FC';
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // Distant clouds
      ctx.fillStyle = '#ffffff';
      const cloudPositions = [100, 350, 700, 1100, 1500, 2000];
      cloudPositions.forEach((cx, i) => {
        const x = (cx - cameraX * 0.2 + gameTime * 10) % (viewWidth + 400) - 100;
        const y = 40 + (i % 3) * 30;
        this.drawCloud(x, y, 60 + (i % 2) * 20);
      });

      // City office skyline silhouettes in distance
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 15; i++) {
        const bx = (i * 140 - cameraX * 0.4) % (viewWidth + 300) - 100;
        const bh = 90 + (i * 37) % 110;
        ctx.fillRect(bx, viewHeight - bh - 64, 80, bh);
        // Mini windows
        ctx.fillStyle = 'rgba(92, 148, 252, 0.8)';
        for (let wy = viewHeight - bh - 50; wy < viewHeight - 75; wy += 14) {
          for (let wx = bx + 8; wx < bx + 70; wx += 16) {
            if ((wx + wy) % 5 !== 0) {
              ctx.fillRect(wx, wy, 8, 8);
            }
          }
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      }
    } else if (theme === 'city') {
      // Urban afternoon
      const grad = ctx.createLinearGradient(0, 0, 0, viewHeight);
      grad.addColorStop(0, '#5C94FC');
      grad.addColorStop(1, '#fed7aa');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // Brick buildings
      ctx.fillStyle = '#cbd5e1';
      for (let i = 0; i < 12; i++) {
        const bx = (i * 160 - cameraX * 0.3) % (viewWidth + 400) - 150;
        const bh = 120 + (i * 41) % 120;
        ctx.fillRect(bx, viewHeight - bh - 64, 110, bh);
      }
    } else if (theme === 'home') {
      // Warm cozy interior wallpaper
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // Subtle diamond wallpaper pattern
      ctx.fillStyle = '#fde68a';
      for (let y = 0; y < viewHeight - 64; y += 32) {
        for (let x = -((cameraX * 0.1) % 32); x < viewWidth; x += 32) {
          ctx.beginPath();
          ctx.moveTo(x + 16, y);
          ctx.lineTo(x + 32, y + 16);
          ctx.lineTo(x + 16, y + 32);
          ctx.lineTo(x, y + 16);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Cozy framed pictures & shelves
      ctx.fillStyle = '#78350f';
      ctx.fillRect(120 - cameraX * 0.3, 80, 70, 50);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(124 - cameraX * 0.3, 84, 62, 42);
    } else if (theme === 'evening') {
      // Late night crunch night sky
      const grad = ctx.createLinearGradient(0, 0, 0, viewHeight);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.6, '#1e1b4b');
      grad.addColorStop(1, '#312e81');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // Moon
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(viewWidth - 120, 80, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(viewWidth - 105, 72, 32, 0, Math.PI * 2);
      ctx.fill();

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 30; i++) {
        const sx = (i * 73) % viewWidth;
        const sy = (i * 47) % (viewHeight - 120);
        const blink = Math.sin(gameTime * 3 + i) > 0;
        if (blink) {
          ctx.fillRect(sx, sy, 3, 3);
        }
      }
    } else if (theme === 'launchpad') {
      // High tech server room & cyber launch
      const grad = ctx.createLinearGradient(0, 0, 0, viewHeight);
      grad.addColorStop(0, '#052e16');
      grad.addColorStop(1, '#022c22');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // Server rack indicators
      ctx.fillStyle = '#10b981';
      for (let i = 0; i < 20; i++) {
        const rx = (i * 90 - cameraX * 0.5) % (viewWidth + 200) - 50;
        const ry = 60 + (i % 4) * 50;
        ctx.fillRect(rx, ry, 6, 6);
        ctx.fillRect(rx + 12, ry, 6, 6);
      }
    } else if (theme === 'vacation') {
      // Tropical island beach
      const grad = ctx.createLinearGradient(0, 0, 0, viewHeight);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.6, '#7dd3fc');
      grad.addColorStop(1, '#bae6fd');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // Golden sun
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(120, 80, 44, 0, Math.PI * 2);
      ctx.fill();

      // Distant turquoise ocean wave band
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, viewHeight - 130, viewWidth, 70);
      ctx.fillStyle = '#38bdf8';
      for (let x = 0; x < viewWidth; x += 40) {
        ctx.beginPath();
        ctx.arc(x + ((gameTime * 20) % 40), viewHeight - 130, 16, 0, Math.PI);
        ctx.fill();
      }
    } else if (theme === 'underground') {
      // Dark sewer / subway cavern
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      ctx.fillStyle = '#27272a';
      for (let y = 0; y < viewHeight; y += 32) {
        for (let x = -((cameraX * 0.2) % 64); x < viewWidth; x += 64) {
          ctx.strokeRect(x, y, 64, 32);
        }
      }
    }
  }

  private drawCloud(x: number, y: number, width: number) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.arc(x + 18, y - 10, 20, 0, Math.PI * 2);
    ctx.arc(x + 40, y, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw All Tiles on screen
  public drawTiles(
    tiles: number[][],
    cameraX: number,
    cameraY: number,
    gameTime: number,
    activePowerup: PowerupType | null
  ) {
    const ctx = this.ctx;
    const startCol = Math.max(0, Math.floor(cameraX / TILE_SIZE));
    const endCol = Math.min(tiles[0].length, Math.ceil((cameraX + 800) / TILE_SIZE) + 1);

    for (let row = 0; row < tiles.length; row++) {
      for (let col = startCol; col < endCol; col++) {
        const tileType = tiles[row][col];
        if (tileType === 0) continue;

        const screenX = Math.floor(col * TILE_SIZE - cameraX);
        const screenY = Math.floor(row * TILE_SIZE - cameraY);

        switch (tileType) {
          case 1: // Solid Ground / Brick floor
            this.drawGroundTile(screenX, screenY);
            break;
          case 2: // Breakable Brick
            this.drawBrickTile(screenX, screenY);
            break;
          case 3: // Question Block (?)
            this.drawQuestionBlock(screenX, screenY, gameTime);
            break;
          case 4: // Hidden Block
            if (activePowerup === 'focus_goggles') {
              this.drawHiddenBlock(screenX, screenY, true);
            }
            break;
          case 5: // Pipe Top Left
          case 6: // Pipe Top Right
          case 7: // Pipe Body Left
          case 8: // Pipe Body Right
          case 13: // Warp Pipe Top Left
          case 14: // Warp Pipe Top Right
            this.drawPipeTile(screenX, screenY, tileType);
            break;
          case 9: // Flagpole Top
            this.drawFlagpole(screenX, screenY, 'top', gameTime);
            break;
          case 10: // Flagpole Pole
            this.drawFlagpole(screenX, screenY, 'pole', gameTime);
            break;
          case 11: // Flagpole Base
            this.drawFlagpole(screenX, screenY, 'base', gameTime);
            break;
          case 12: // Life Event Diamond Block
            this.drawEventBlock(screenX, screenY, gameTime);
            break;
          case 15: // Coffee Dispenser Box
            this.drawCoffeeDispenser(screenX, screenY, gameTime);
            break;
        }
      }
    }
  }

  // Draw Ground Tile
  private drawGroundTile(x: number, y: number) {
    const ctx = this.ctx;
    ctx.fillStyle = '#8A4500'; // Vibrant retro ground brown
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

    // Brick pattern
    ctx.fillStyle = '#502400';
    ctx.fillRect(x, y, TILE_SIZE, 2);
    ctx.fillRect(x, y + 15, TILE_SIZE, 2);
    ctx.fillRect(x + 15, y, 2, 16);
    ctx.fillRect(x, y + 16, 2, 16);
    ctx.fillRect(x + 30, y + 16, 2, 16);

    // Brick highlight
    ctx.fillStyle = '#B85C00';
    ctx.fillRect(x + 2, y + 2, 12, 2);
    ctx.fillRect(x + 17, y + 2, 12, 2);

    // Vibrant green grass trim on top
    ctx.fillStyle = '#448844';
    ctx.fillRect(x, y, TILE_SIZE, 4);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x + 2, y, 6, 2);
    ctx.fillRect(x + 14, y, 6, 2);
    ctx.fillRect(x + 24, y, 2, 4);
  }

  // Draw Breakable Brick Tile
  private drawBrickTile(x: number, y: number) {
    const ctx = this.ctx;
    ctx.fillStyle = '#B85C00'; // Vibrant Mario brick orange
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

    ctx.fillStyle = '#502400';
    ctx.strokeRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2);
    ctx.fillRect(x, y + 15, TILE_SIZE, 2);
    ctx.fillRect(x + 15, y, 2, 16);
    ctx.fillRect(x + 8, y + 16, 2, 16);
    ctx.fillRect(x + 24, y + 16, 2, 16);

    // Brick highlight
    ctx.fillStyle = '#E76E33';
    ctx.fillRect(x + 2, y + 2, 12, 2);
    ctx.fillRect(x + 17, y + 2, 12, 2);
  }

  // Draw Retro Question Block `?`
  private drawQuestionBlock(x: number, y: number, gameTime: number) {
    const ctx = this.ctx;
    const bounceOffset = Math.sin(gameTime * 8) * 1.5;

    ctx.fillStyle = '#FFD700'; // Golden yellow
    ctx.fillRect(x, y + bounceOffset, TILE_SIZE, TILE_SIZE);

    // Outer border
    ctx.fillStyle = '#B85C00';
    ctx.strokeRect(x + 1, y + bounceOffset + 1, TILE_SIZE - 2, TILE_SIZE - 2);

    // Corner rivets
    ctx.fillStyle = '#8A4500';
    ctx.fillRect(x + 3, y + bounceOffset + 3, 2, 2);
    ctx.fillRect(x + TILE_SIZE - 5, y + bounceOffset + 3, 2, 2);
    ctx.fillRect(x + 3, y + bounceOffset + TILE_SIZE - 5, 2, 2);
    ctx.fillRect(x + TILE_SIZE - 5, y + bounceOffset + TILE_SIZE - 5, 2, 2);

    // Question Mark text
    ctx.fillStyle = '#000000';
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', x + TILE_SIZE / 2, y + bounceOffset + TILE_SIZE / 2 + 1);
  }

  // Draw Focus Hidden Block
  private drawHiddenBlock(x: number, y: number, revealed: boolean) {
    const ctx = this.ctx;
    if (!revealed) return;

    ctx.fillStyle = 'rgba(92, 148, 252, 0.4)';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    ctx.strokeStyle = '#5C94FC';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2);
    ctx.setLineDash([]);

    ctx.fillStyle = '#5C94FC';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
  }

  // Draw Pipe Tiles
  private drawPipeTile(x: number, y: number, type: number) {
    const ctx = this.ctx;
    const isWarp = type === 13 || type === 14;

    if (type === 5 || type === 13) {
      // Pipe Top Left
      ctx.fillStyle = isWarp ? '#E52521' : '#448844';
      ctx.fillRect(x - 2, y, TILE_SIZE + 2, TILE_SIZE);
      ctx.fillStyle = isWarp ? '#f87171' : '#22c55e';
      ctx.fillRect(x, y + 2, 6, TILE_SIZE - 4);
      ctx.fillStyle = isWarp ? '#991b1b' : '#14532d';
      ctx.fillRect(x - 2, y, TILE_SIZE + 2, 3);
    } else if (type === 6 || type === 14) {
      // Pipe Top Right
      ctx.fillStyle = isWarp ? '#E52521' : '#448844';
      ctx.fillRect(x, y, TILE_SIZE + 2, TILE_SIZE);
      ctx.fillStyle = isWarp ? '#991b1b' : '#14532d';
      ctx.fillRect(x + TILE_SIZE - 6, y + 2, 6, TILE_SIZE - 4);
      ctx.fillRect(x, y, TILE_SIZE + 2, 3);
    } else if (type === 7) {
      // Pipe Body Left
      ctx.fillStyle = '#448844';
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(x + 2, y, 6, TILE_SIZE);
    } else if (type === 8) {
      // Pipe Body Right
      ctx.fillStyle = '#448844';
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = '#14532d';
      ctx.fillRect(x + TILE_SIZE - 8, y, 6, TILE_SIZE);
    }
  }

  // Draw Event / Life Decision Block
  private drawEventBlock(x: number, y: number, gameTime: number) {
    const ctx = this.ctx;
    const pulse = Math.abs(Math.sin(gameTime * 4));
    
    ctx.fillStyle = '#a855f7'; // Purple neon
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

    ctx.fillStyle = '#6b21a8';
    ctx.strokeRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2);

    ctx.fillStyle = pulse > 0.5 ? '#fbcfe8' : '#ffffff';
    ctx.font = '14px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
  }

  // Draw Coffee Dispenser Block
  private drawCoffeeDispenser(x: number, y: number, gameTime: number) {
    const ctx = this.ctx;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('☕', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
  }

  // Draw Flagpole
  private drawFlagpole(x: number, y: number, part: 'top' | 'pole' | 'base', gameTime: number) {
    const ctx = this.ctx;

    if (part === 'top') {
      ctx.fillStyle = '#eab308'; // Golden sphere
      ctx.beginPath();
      ctx.arc(x + 16, y + 8, 8, 0, Math.PI * 2);
      ctx.fill();

      // Waving victory green flag
      const wave = Math.sin(gameTime * 6) * 4;
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(x + 16, y + 8);
      ctx.lineTo(x + 48 + wave, y + 20);
      ctx.lineTo(x + 16, y + 32);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('40h', x + 26, y + 22);
    } else if (part === 'pole') {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 14, y, 4, TILE_SIZE);
    } else if (part === 'base') {
      ctx.fillStyle = '#475569';
      ctx.fillRect(x + 4, y + 16, 24, 16);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 14, y, 4, 16);
    }
  }

  // Draw Player Avatar (Walking, Jumping, Powered Up, Facing Left/Right)
  public drawPlayer(
    player: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      grounded: boolean;
      facing: 'left' | 'right';
      animFrame: number;
      isInvincible: boolean;
      activePowerup: PowerupType | null;
    },
    character: CharacterType,
    cameraX: number,
    cameraY: number,
    gameTime: number
  ) {
    const ctx = this.ctx;
    const px = Math.floor(player.x - cameraX);
    const py = Math.floor(player.y - cameraY);

    // Invincibility flash / delegation shield rainbow aura
    if (player.isInvincible && Math.floor(gameTime * 20) % 2 === 0) {
      return; // Flash effect
    }

    ctx.save();
    ctx.translate(px + 16, py + 16);
    if (player.facing === 'left') {
      ctx.scale(-1, 1);
    }

    // Shield Aura if active
    if (player.activePowerup === 'delegation_shield') {
      const shieldPulse = Math.sin(gameTime * 10) * 4;
      ctx.strokeStyle = `hsl(${(gameTime * 300) % 360}, 100%, 65%)`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 20 + shieldPulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Colors and styling by Designer Archetype
    let shirtColor = '#2563eb';
    let pantsColor = '#1e293b';
    let capColor = '#1d4ed8';
    let accessoryColor = '#94a3b8';

    if (character === 'structure_designer') {
      shirtColor = '#2563eb'; // Blueprint Cobalt
      pantsColor = '#1e293b'; // Slate Work Jeans
      capColor = '#1d4ed8'; // Hardhat / Architect cap
      accessoryColor = '#60a5fa'; // Rolled Blueprint Tube
    } else if (character === 'graphic_designer') {
      shirtColor = '#db2777'; // Vibrant Magenta Pullover
      pantsColor = '#0f172a'; // Dark Studio Slacks
      capColor = '#ec4899'; // Stylist Beret
      accessoryColor = '#a855f7'; // Digital Graphic Tablet
    } else if (character === 'floor_plan_designer') {
      shirtColor = '#10b981'; // Architectural Emerald
      pantsColor = '#334155'; // Work Chinos
      capColor = '#059669'; // Planner Cap
      accessoryColor = '#facc15'; // Scale Ruler & Measuring Roll
    } else if (character === 'conceptual_designer') {
      shirtColor = '#f59e0b'; // Radiant Gold Smock
      pantsColor = '#18181b'; // Charcoal Pants
      capColor = '#d97706'; // Visionary Amber Beret
      accessoryColor = '#fde047'; // Idea Concept Notebook
    }

    if (player.activePowerup === 'espresso') {
      shirtColor = '#d97706'; // Golden espresso glow
      capColor = '#78350f';
    }

    // Body
    ctx.fillStyle = shirtColor;
    ctx.fillRect(-8, -4, 16, 14);

    // Overalls / Pants
    ctx.fillStyle = pantsColor;
    ctx.fillRect(-7, 4, 14, 8);

    // Legs / Feet with walking animation
    const walkOffset = player.grounded && Math.abs(player.vx) > 0.1 ? Math.sin(player.animFrame * 0.4) * 4 : 0;
    if (!player.grounded) {
      // Jump pose
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-10, 8, 8, 6);
      ctx.fillRect(2, 6, 8, 6);
    } else {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-9, 10 + walkOffset, 8, 5);
      ctx.fillRect(1, 10 - walkOffset, 8, 5);
    }

    // Head / Face
    ctx.fillStyle = '#fbcfe8'; // Peach skin
    ctx.fillRect(-6, -14, 12, 10);

    // Eye
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(2, -11, 3, 3);

    // Mustache / Smile
    ctx.fillStyle = '#451a03';
    ctx.fillRect(1, -7, 6, 3);

    // Cap / Hair
    ctx.fillStyle = capColor;
    ctx.fillRect(-8, -17, 16, 5);
    ctx.fillRect(0, -15, 10, 3); // Cap visor

    // Focus Goggles overlay if active
    if (player.activePowerup === 'focus_goggles') {
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(0, -12, 7, 5);
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(1, -11, 4, 3);
    }

    // Designer Accessory in backpack or hand (Blueprint roll / Graphic tablet / Scale ruler / Concept pad)
    ctx.fillStyle = accessoryColor;
    ctx.fillRect(-12, -3, 5, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-11, -2, 3, 3); // Highlight detail

    ctx.restore();
  }

  // Draw Enemies & Obstacles
  public drawEntity(
    entity: {
      type: string;
      x: number;
      y: number;
      vx?: number;
      dead?: boolean;
      stateTimer?: number;
    },
    cameraX: number,
    cameraY: number,
    gameTime: number
  ) {
    const ctx = this.ctx;
    const ex = Math.floor(entity.x - cameraX);
    const ey = Math.floor(entity.y - cameraY);

    if (entity.dead) {
      // Squished flat enemy
      ctx.fillStyle = '#64748b';
      ctx.fillRect(ex, ey + 24, 32, 8);
      return;
    }

    switch (entity.type) {
      case 'bug_enemy': {
        // Green Software Bug Monster
        const legWiggle = Math.sin(gameTime * 15) * 3;
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(ex + 4, ey + 8, 24, 18);
        ctx.fillStyle = '#15803d';
        ctx.fillRect(ex + 6, ey + 10, 20, 14);

        // Antennae
        ctx.fillStyle = '#14532d';
        ctx.fillRect(ex + 8, ey + 2, 3, 6);
        ctx.fillRect(ex + 20, ey + 2, 3, 6);

        // Red angry bug eyes
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(ex + 8, ey + 12, 4, 4);
        ctx.fillRect(ex + 18, ey + 12, 4, 4);

        // Legs
        ctx.fillStyle = '#052e16';
        ctx.fillRect(ex, ey + 22 + legWiggle, 6, 6);
        ctx.fillRect(ex + 26, ey + 22 - legWiggle, 6, 6);
        break;
      }

      case 'jira_ticket': {
        // Flying Blue Jira Ticket
        const floatY = Math.sin(gameTime * 4 + entity.x) * 4;
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(ex + 2, ey + floatY + 2, 28, 22);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ex + 6, ey + floatY + 6, 14, 3);
        ctx.fillRect(ex + 6, ey + floatY + 11, 20, 3);
        // Urgent red badge
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(ex + 20, ey + floatY + 16, 7, 5);
        break;
      }

      case 'flu_virus': {
        // Spiky Purple Virus
        const spin = gameTime * 3;
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(ex + 16, ey + 16, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#7e22ce';
        ctx.fillRect(ex + 10, ey + 12, 4, 4);
        ctx.fillRect(ex + 18, ey + 12, 4, 4);
        ctx.fillRect(ex + 12, ey + 20, 8, 3);
        break;
      }

      case 'distraction_cat': {
        // Playful Orange Cat
        ctx.fillStyle = '#f97316';
        ctx.fillRect(ex + 4, ey + 12, 22, 14); // Body
        ctx.fillRect(ex + 18, ey + 6, 12, 10); // Head
        // Ears
        ctx.beginPath();
        ctx.moveTo(ex + 18, ey + 6);
        ctx.lineTo(ex + 22, ey);
        ctx.lineTo(ex + 25, ey + 6);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#15803d';
        ctx.fillRect(ex + 24, ey + 8, 3, 3);
        break;
      }

      case 'laundry_monster': {
        // Fluffy pile of clothes
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(ex + 2, ey + 14, 28, 14);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(ex + 6, ey + 6, 20, 10);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(ex + 10, ey + 2, 12, 8);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(ex + 10, ey + 8, 3, 3);
        ctx.fillRect(ex + 18, ey + 8, 3, 3);
        break;
      }

      case 'clock_shift': {
        // Speeding clock on legs
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(ex + 16, ey + 14, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Clock hands spinning
        ctx.strokeStyle = '#854d0e';
        ctx.beginPath();
        ctx.moveTo(ex + 16, ey + 14);
        ctx.lineTo(ex + 16 + Math.cos(gameTime * 8) * 8, ey + 14 + Math.sin(gameTime * 8) * 8);
        ctx.stroke();
        break;
      }

      case 'hour_token': {
        // Glowing Gold +1.0 Hour Coin
        const spin = Math.sin(gameTime * 5);
        const scaleX = Math.abs(spin);
        ctx.save();
        ctx.translate(ex + 16, ey + 16);
        ctx.scale(scaleX, 1);
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ca8a04';
        ctx.stroke();
        ctx.fillStyle = '#713f12';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('1h', 0, 0);
        ctx.restore();
        break;
      }

      case 'coffee_cup': {
        // Espresso mug with steam
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ex + 6, ey + 10, 18, 16);
        ctx.fillRect(ex + 22, ey + 14, 5, 8);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(ex + 8, ey + 12, 14, 4);

        // Steam particles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        const steam = Math.sin(gameTime * 6) * 3;
        ctx.fillRect(ex + 10 + steam, ey + 4, 3, 4);
        ctx.fillRect(ex + 16 - steam, ey + 2, 3, 4);
        break;
      }

      case 'shield_star': {
        // Super Delegation Star
        const pulse = Math.sin(gameTime * 8) * 2;
        ctx.fillStyle = `hsl(${(gameTime * 200) % 360}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(ex + 16, ey + 16, 12 + pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', ex + 16, ey + 16);
        break;
      }

      case 'goggles_item': {
        // Focus Goggles
        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(ex + 4, ey + 10, 11, 10);
        ctx.fillRect(ex + 17, ey + 10, 11, 10);
        ctx.fillRect(ex + 13, ey + 14, 6, 3);
        ctx.fillStyle = '#a5f3fc';
        ctx.fillRect(ex + 6, ey + 12, 7, 6);
        ctx.fillRect(ex + 19, ey + 12, 7, 6);
        break;
      }

      case 'snack': {
        // Apple / Bento Box
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(ex + 16, ey + 16, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#15803d';
        ctx.fillRect(ex + 15, ey + 4, 3, 4);
        break;
      }

      case 'life_event_node': {
        // Glowing Decision Beacon
        const beaconPulse = Math.sin(gameTime * 6) * 4;
        ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.beginPath();
        ctx.arc(ex + 16, ey + 16, 18 + beaconPulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#c084fc';
        ctx.fillRect(ex + 6, ey + 6, 20, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', ex + 16, ey + 16);
        break;
      }
    }
  }

  // Draw Dynamic Particles & Floating Labels
  public drawParticles(particles: Particle[], cameraX: number, cameraY: number) {
    const ctx = this.ctx;
    particles.forEach((p) => {
      const alpha = Math.max(0, p.life / p.maxLife);
      const px = Math.floor(p.x - cameraX);
      const py = Math.floor(p.y - cameraY);

      if (p.text) {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.font = '10px "Press Start 2P", monospace';
        ctx.strokeText(p.text, px, py);
        ctx.fillText(p.text, px, py);
      } else {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(px, py, p.size, p.size);
        ctx.globalAlpha = 1.0;
      }
    });
  }
}
