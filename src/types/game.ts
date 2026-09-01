export interface WorkTask {
  id: string;
  title: string;
  clientOrBoss: string;
  description: string;
  difficulty: 'Standard' | 'Demanding' | 'Hardcore';
  targetHours: number; // 40
  designerType?: CharacterType;
}

export type GameState = 
  | 'title' 
  | 'briefing' 
  | 'character_select' 
  | 'playing' 
  | 'life_event' 
  | 'level_clear' 
  | 'game_over' 
  | 'victory' 
  | 'instructions';

export type CharacterType = 
  | 'structure_designer' 
  | 'graphic_designer' 
  | 'floor_plan_designer' 
  | 'conceptual_designer';

export interface ScoreboardEntry {
  id: string;
  playerName: string;
  role: string;
  characterRole?: string;
  characterType?: CharacterType;
  score: number;
  hoursLogged: number;
  quality?: number;
  taskQuality?: number;
  grade: string;
  date: string;
  isCurrentPlayer?: boolean;
}

export interface CharacterProfile {
  id: CharacterType;
  name: string;
  role: string;
  perk: string;
  description: string;
  avatarColor: string;
  speedMultiplier: number;
  jumpMultiplier: number;
  energyDrainRate: number;
}

export interface PlayerStats {
  hoursLogged: number; // 0 to 40
  targetHours: number; // 40
  taskQuality: number; // 0 to 100%
  energy: number; // 0 to 100%
  morale: number; // 0 to 100%
  lives: number; // Sick days / Respawns (typically 3)
  score: number;
  overtimeHours: number;
  activePowerup: PowerupType | null;
  powerupTimer: number; // in seconds or frames
  hiddenZonesFound: number;
  lifeChoicesMade: number;
  dayIndex: number; // 0 to 4 (Monday to Friday)
}

export type PowerupType = 
  | 'espresso' // Speed + Double Jump
  | 'focus_goggles' // Reveals invisible blocks & warp shortcuts
  | 'delegation_shield' // Invincibility against distraction enemies
  | 'energy_drink' // Max energy & stamina
  | 'time_buffer'; // Slows down day clock & gives +2.0 bonus hour credits

export interface LifeEventOption {
  text: string;
  impactHours: number; // e.g. -2 (lost work time) or +0
  impactQuality: number; // e.g. +5% or -10%
  impactMorale: number; // e.g. +20%
  impactEnergy: number; // e.g. -15%
  overtimeNeeded?: number; // e.g. +2h overtime unlocked
  narrativeResult: string;
}

export interface LifeEvent {
  id: string;
  title: string;
  subtitle: string;
  category: 'health' | 'family' | 'home' | 'urgent' | 'vacation';
  icon: string;
  prompt: string;
  options: LifeEventOption[];
}

export interface TileMap {
  width: number;
  height: number;
  theme: 'office' | 'city' | 'home' | 'evening' | 'launchpad' | 'underground' | 'vacation';
  levelName: string;
  dayName: string;
  timeLimit: number; // seconds
  tiles: number[][]; // 0: air, 1: solid ground, 2: brick, 3: question_block, 4: hidden_block, 5: pipe_top_left, 6: pipe_top_right, 7: pipe_body_left, 8: pipe_body_right, 9: flagpole, 10: coin_box, 11: coffee_box, 12: event_trigger_box, 13: warp_pipe, 14: hazard
  entities: EntityConfig[];
  warpTarget?: {
    levelId: string;
    spawnX: number;
    spawnY: number;
  };
}

export interface EntityConfig {
  type: 'bug_enemy' | 'jira_ticket' | 'flu_virus' | 'distraction_cat' | 'laundry_monster' | 'clock_shift' | 'life_event_node' | 'coffee_cup' | 'hour_token' | 'goggles_item' | 'shield_star' | 'snack';
  x: number;
  y: number;
  properties?: Record<string, any>;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  text?: string;
}

export interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  opacity: number;
  life: number;
}
