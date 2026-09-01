import { CharacterType, TileMap } from '../types/game';
import { getRoleEventKeyForDay } from '../data/gameData';

// Tile Legend:
// 0: Air
// 1: Solid Ground / Brick Ground
// 2: Breakable Brick
// 3: Question Box (Contains Hour Token or Coffee)
// 4: Hidden Invisible Block (Revealed by hitting from below or Focus Goggles)
// 5: Pipe Top Left
// 6: Pipe Top Right
// 7: Pipe Body Left
// 8: Pipe Body Right
// 9: Flagpole Top
// 10: Flagpole Pole
// 11: Flagpole Base
// 12: Special Event Block (Missing info / Life event)
// 13: Warp Pipe Top Left (Press Down to enter secret level)
// 14: Warp Pipe Top Right
// 15: Coffee Dispenser Block
// 16: Spikes / Obstacle Hazard

export const TILE_SIZE = 32;

// Helper to generate empty map
function createEmptyGrid(width: number, height: number): number[][] {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    grid[y] = new Array(width).fill(0);
  }
  return grid;
}

// Helper to build standard pipe
function placePipe(tiles: number[][], x: number, topY: number, height: number = 3, isWarp: boolean = false) {
  tiles[topY][x] = isWarp ? 13 : 5;
  tiles[topY][x + 1] = isWarp ? 14 : 6;
  for (let y = topY + 1; y < topY + height; y++) {
    tiles[y][x] = 7;
    tiles[y][x + 1] = 8;
  }
}

// Helper to build staircase
function placeStairs(tiles: number[][], startX: number, steps: number, groundY: number = 13, direction: 'up' | 'down' = 'up') {
  for (let i = 0; i < steps; i++) {
    const col = startX + i;
    const h = direction === 'up' ? i + 1 : steps - i;
    for (let dy = 1; dy <= h; dy++) {
      tiles[groundY - dy][col] = 1;
    }
  }
}

// Helper to place flagpole
function placeFlagpole(tiles: number[][], x: number, topY: number = 4, baseY: number = 12) {
  tiles[topY][x] = 9;
  for (let y = topY + 1; y < baseY; y++) {
    tiles[y][x] = 10;
  }
  tiles[baseY][x] = 11;
}

// =====================================================================
// Level 1: Monday - Sprint Kickoff & Drafting Campus (Expanded 160 Tiles)
// =====================================================================
export function createLevel1(characterRole: CharacterType = 'structure_designer'): TileMap {
  const width = 160;
  const height = 15;
  const tiles = createEmptyGrid(width, height);
  const eventKey = getRoleEventKeyForDay(0, characterRole);

  // Ground layer with architectural gaps
  for (let x = 0; x < width; x++) {
    if ((x >= 32 && x <= 34) || (x >= 75 && x <= 77) || (x >= 118 && x <= 120)) {
      continue; // Pit gaps
    }
    tiles[13][x] = 1;
    tiles[14][x] = 1;
  }

  // Section 1: Studio Entrance & Coffee Station (x: 0-40)
  tiles[9][8] = 3; // Hour token block
  tiles[9][10] = 2; // Brick
  tiles[9][11] = 15; // Coffee dispenser
  tiles[9][12] = 2; // Brick
  tiles[9][14] = 12; // Role Event Block
  tiles[6][11] = 4; // Hidden focus block!

  placePipe(tiles, 20, 11, 2);
  
  for (let x = 24; x <= 30; x += 2) {
    tiles[9][x] = 3;
  }

  // Section 2: High Scaffolding & Drafting Mezzanine (x: 40-85)
  placePipe(tiles, 42, 10, 3);

  // High Drafting Bridge
  for (let x = 48; x <= 64; x++) {
    if (x % 3 === 0) {
      tiles[8][x] = 3;
    } else {
      tiles[8][x] = 2;
    }
  }

  // Secret Warp Pipe to Subway Overtime Cavern at x=56
  placePipe(tiles, 56, 5, 3, true);

  // Hidden high blocks
  tiles[5][68] = 4;
  tiles[5][70] = 4;
  tiles[5][72] = 3;

  // Section 3: Structural Load Deck & Midpoint Event (x: 85-130)
  placePipe(tiles, 88, 11, 2);

  tiles[9][94] = 12; // Life Event Block (Bio needs/lunch)
  tiles[9][96] = 15; // Coffee Bar
  tiles[9][98] = 3; // Hour token

  for (let x = 104; x <= 114; x += 2) {
    tiles[8][x] = 2;
    tiles[5][x] = 3;
  }

  // Section 4: Grand Architectural Staircase to Flagpole (x: 130-160)
  placeStairs(tiles, 134, 5, 13, 'up');
  placeStairs(tiles, 142, 5, 13, 'down');
  placeStairs(tiles, 148, 6, 13, 'up');

  placeFlagpole(tiles, 156, 4, 12);

  return {
    width,
    height,
    theme: 'office',
    levelName: 'Level 1: Monday Kickoff',
    dayName: 'Monday 09:00 AM - Sprint Kickoff & Drafting Campus',
    timeLimit: 420,
    tiles,
    entities: [
      { type: 'bug_enemy', x: 14 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 26 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 38 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 48 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'jira_ticket', x: 62 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 80 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 96 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 110 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'bug_enemy', x: 126 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'hour_token', x: 8 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 24 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 28 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 50 * TILE_SIZE, y: 6 * TILE_SIZE },
      { type: 'hour_token', x: 60 * TILE_SIZE, y: 6 * TILE_SIZE },
      { type: 'hour_token', x: 106 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 112 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'coffee_cup', x: 11 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'coffee_cup', x: 96 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'goggles_item', x: 68 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'shield_star', x: 104 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'life_event_node', x: 14 * TILE_SIZE, y: 8 * TILE_SIZE, properties: { eventId: eventKey } },
      { type: 'life_event_node', x: 94 * TILE_SIZE, y: 8 * TILE_SIZE, properties: { eventId: 'bio_needs' } },
    ],
  };
}

// =====================================================================
// Level 2: Tuesday - Mid-Sprint Urban Transit & Field Visits (175 Tiles)
// =====================================================================
export function createLevel2(characterRole: CharacterType = 'structure_designer'): TileMap {
  const width = 175;
  const height = 15;
  const tiles = createEmptyGrid(width, height);
  const eventKey = getRoleEventKeyForDay(1, characterRole);

  // Ground layer with gaps
  for (let x = 0; x < width; x++) {
    if ((x >= 28 && x <= 30) || (x >= 65 && x <= 68) || (x >= 110 && x <= 113) || (x >= 148 && x <= 150)) {
      continue;
    }
    tiles[13][x] = 1;
    tiles[14][x] = 1;
  }

  // Section 1: City Transit & Vet Emergency (x: 0-45)
  tiles[9][8] = 3;
  tiles[9][10] = 12; // Vet / Role event
  tiles[9][12] = 3;

  placePipe(tiles, 18, 10, 3, true); // Secret warp pipe!

  tiles[9][24] = 2;
  tiles[9][25] = 4; // Hidden shield
  tiles[9][26] = 2;

  // Section 2: Construction Cranes & High Scaffolding (x: 45-100)
  placePipe(tiles, 46, 9, 4);

  for (let x = 52; x <= 62; x += 2) {
    tiles[9][x] = 3;
    tiles[6][x] = 2;
  }

  tiles[9][74] = 12; // Kids school emergency event
  tiles[9][76] = 15; // Coffee

  placePipe(tiles, 84, 10, 3);

  for (let x = 90; x <= 104; x += 3) {
    tiles[8][x] = 3;
  }

  // Section 3: Urban Health Clinic & Coordination Plaza (x: 100-150)
  tiles[8][118] = 12; // Doctor visit / role check
  tiles[8][120] = 15; // Snack dispenser
  tiles[8][122] = 3;

  for (let x = 128; x <= 140; x += 2) {
    tiles[9][x] = 2;
    tiles[6][x] = 3;
  }

  // Section 4: Summit Stairs & Flagpole (x: 150-175)
  placeStairs(tiles, 154, 6, 13, 'up');
  placeFlagpole(tiles, 166, 4, 12);

  return {
    width,
    height,
    theme: 'city',
    levelName: 'Level 2: Tuesday Mid-Sprint',
    dayName: 'Tuesday 11:30 AM - Urban Transit, Site Visits & Coordination',
    timeLimit: 450,
    tiles,
    entities: [
      { type: 'distraction_cat', x: 12 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 22 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 36 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'distraction_cat', x: 54 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 72 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'distraction_cat', x: 92 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 105 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 124 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'distraction_cat', x: 142 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'hour_token', x: 8 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 12 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 54 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 58 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 92 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 98 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 130 * TILE_SIZE, y: 5 * TILE_SIZE },
      { type: 'hour_token', x: 136 * TILE_SIZE, y: 5 * TILE_SIZE },
      { type: 'coffee_cup', x: 76 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'snack', x: 120 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'shield_star', x: 25 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'goggles_item', x: 60 * TILE_SIZE, y: 5 * TILE_SIZE },
      { type: 'life_event_node', x: 10 * TILE_SIZE, y: 8 * TILE_SIZE, properties: { eventId: eventKey } },
      { type: 'life_event_node', x: 74 * TILE_SIZE, y: 8 * TILE_SIZE, properties: { eventId: 'kids_school' } },
      { type: 'life_event_node', x: 118 * TILE_SIZE, y: 7 * TILE_SIZE, properties: { eventId: 'doctor_visit' } },
    ],
  };
}

// =====================================================================
// Level 3: Wednesday - Remote Work Studio & Household Chores (180 Tiles)
// =====================================================================
export function createLevel3(characterRole: CharacterType = 'structure_designer'): TileMap {
  const width = 180;
  const height = 15;
  const tiles = createEmptyGrid(width, height);
  const eventKey = getRoleEventKeyForDay(2, characterRole);

  // Ground layer with gaps
  for (let x = 0; x < width; x++) {
    if ((x >= 30 && x <= 33) || (x >= 70 && x <= 73) || (x >= 115 && x <= 118) || (x >= 152 && x <= 154)) {
      continue;
    }
    tiles[13][x] = 1;
    tiles[14][x] = 1;
  }

  // Section 1: Home Loft Studio & Kitchen Chores (x: 0-50)
  tiles[9][8] = 3;
  tiles[9][10] = 12; // Chores / Role event
  tiles[9][12] = 3;

  tiles[12][18] = 2;
  tiles[11][19] = 2;
  tiles[10][20] = 2;

  tiles[8][26] = 3;
  tiles[8][28] = 15; // Snack
  tiles[8][30] = 3;

  // Section 2: High Workshop Mezzanine & Library (x: 50-105)
  placePipe(tiles, 52, 10, 3, true); // Secret studio lounge pipe!

  for (let x = 58; x <= 78; x += 2) {
    tiles[8][x] = 2;
    if (x % 4 === 0) {
      tiles[5][x] = 3;
    }
  }

  tiles[9][86] = 12; // Kids pediatrician event
  tiles[9][88] = 15; // Coffee
  tiles[9][90] = 3;

  placePipe(tiles, 98, 11, 2);

  // Section 3: Multi-Monitor CAD Workstation & Sun Deck (x: 105-155)
  for (let x = 106; x <= 120; x += 3) {
    tiles[8][x] = 3;
  }

  tiles[8][128] = 12; // Role Dilemma Event block
  tiles[8][130] = 3;

  for (let x = 136; x <= 148; x += 2) {
    tiles[9][x] = 2;
    tiles[6][x] = 3;
  }

  // Section 4: Wednesday Flagpole (x: 155-180)
  placeStairs(tiles, 160, 6, 13, 'up');
  placeFlagpole(tiles, 172, 4, 12);

  return {
    width,
    height,
    theme: 'home',
    levelName: 'Level 3: Wednesday Hump Day',
    dayName: 'Wednesday 02:00 PM - Remote Studio, CAD Modeling & Chores',
    timeLimit: 450,
    tiles,
    entities: [
      { type: 'laundry_monster', x: 14 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'distraction_cat', x: 24 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'laundry_monster', x: 42 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 62 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'laundry_monster', x: 78 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'distraction_cat', x: 92 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 112 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'laundry_monster', x: 132 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 146 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'hour_token', x: 8 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 12 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 60 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 68 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 108 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 114 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 140 * TILE_SIZE, y: 5 * TILE_SIZE },
      { type: 'coffee_cup', x: 28 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'coffee_cup', x: 88 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'shield_star', x: 64 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'goggles_item', x: 120 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'life_event_node', x: 10 * TILE_SIZE, y: 8 * TILE_SIZE, properties: { eventId: eventKey } },
      { type: 'life_event_node', x: 86 * TILE_SIZE, y: 8 * TILE_SIZE, properties: { eventId: 'kids_doctor' } },
      { type: 'life_event_node', x: 128 * TILE_SIZE, y: 7 * TILE_SIZE, properties: { eventId: 'chores_and_dinner' } },
    ],
  };
}

// =====================================================================
// Level 4: Thursday - Due Date Crunch, Late Night & Overtime (190 Tiles)
// =====================================================================
export function createLevel4(characterRole: CharacterType = 'structure_designer'): TileMap {
  const width = 190;
  const height = 15;
  const tiles = createEmptyGrid(width, height);
  const eventKey = getRoleEventKeyForDay(3, characterRole);

  // Ground layer with gaps
  for (let x = 0; x < width; x++) {
    if ((x >= 24 && x <= 27) || (x >= 60 && x <= 63) || (x >= 105 && x <= 108) || (x >= 150 && x <= 153)) {
      continue;
    }
    tiles[13][x] = 1;
    tiles[14][x] = 1;
  }

  // Section 1: Emergency Deadline Shift & Health Warning (x: 0-50)
  tiles[9][8] = 12; // Due date shift / role event
  tiles[9][10] = 3;
  tiles[9][12] = 3;

  tiles[8][18] = 2;
  tiles[8][19] = 12; // Illness virus event block
  tiles[8][20] = 2;

  placePipe(tiles, 32, 10, 3);

  // Section 2: Midnight High Scaffolding & Secret Vacation Portal (x: 50-110)
  for (let x = 44; x <= 56; x += 2) {
    tiles[8][x] = 3;
  }

  // High cloud path to 2-Week Vacation Island at x=82
  tiles[5][76] = 4;
  tiles[5][78] = 4;
  tiles[4][80] = 4;
  placePipe(tiles, 82, 3, 3, true); // Warp to Vacation Paradise!

  tiles[8][92] = 12; // Late night overtime event
  tiles[8][94] = 15; // Espresso machine

  placePipe(tiles, 100, 10, 3);

  // Section 3: Engineering Tower & Structural Wind Tunnel (x: 110-160)
  for (let x = 114; x <= 128; x += 2) {
    tiles[8][x] = 2;
    tiles[5][x] = 3;
  }

  tiles[8][138] = 12; // Role Dilemma block
  tiles[8][140] = 3;

  // Section 4: Thursday Midnight Flagpole (x: 160-190)
  placeStairs(tiles, 168, 7, 13, 'up');
  placeFlagpole(tiles, 182, 4, 12);

  return {
    width,
    height,
    theme: 'evening',
    levelName: 'Level 4: Thursday Crunch',
    dayName: 'Thursday 08:00 PM - Deadline Shift, Tower Scaffolding & Overtime',
    timeLimit: 480,
    tiles,
    entities: [
      { type: 'flu_virus', x: 14 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'clock_shift', x: 28 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'flu_virus', x: 48 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 68 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'clock_shift', x: 88 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 112 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'flu_virus', x: 126 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'clock_shift', x: 144 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 160 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'hour_token', x: 10 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 46 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 52 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 116 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 124 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 140 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'coffee_cup', x: 94 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'snack', x: 50 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'shield_star', x: 114 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'goggles_item', x: 74 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'life_event_node', x: 8 * TILE_SIZE, y: 8 * TILE_SIZE, properties: { eventId: eventKey } },
      { type: 'life_event_node', x: 19 * TILE_SIZE, y: 7 * TILE_SIZE, properties: { eventId: 'short_term_illness' } },
      { type: 'life_event_node', x: 92 * TILE_SIZE, y: 7 * TILE_SIZE, properties: { eventId: 'overtime_crunch' } },
    ],
  };
}

// =====================================================================
// Level 5: Friday - Grand Release, Municipal Signoff & 40h Summit (200 Tiles)
// =====================================================================
export function createLevel5(characterRole: CharacterType = 'structure_designer'): TileMap {
  const width = 200;
  const height = 15;
  const tiles = createEmptyGrid(width, height);
  const eventKey = getRoleEventKeyForDay(4, characterRole);

  // Ground layer with gaps
  for (let x = 0; x < width; x++) {
    if ((x >= 32 && x <= 35) || (x >= 75 && x <= 78) || (x >= 120 && x <= 123) || (x >= 165 && x <= 168)) {
      continue;
    }
    tiles[13][x] = 1;
    tiles[14][x] = 1;
  }

  // Section 1: Pre-Release Freeze & Final Calculations (x: 0-55)
  tiles[9][8] = 3;
  tiles[9][10] = 3;
  tiles[9][12] = 15; // Espresso machine

  for (let x = 18; x <= 30; x += 2) {
    tiles[8][x] = 2;
    tiles[5][x] = 3;
  }

  placePipe(tiles, 42, 10, 3);

  // Section 2: High Data Highway & Precision Verification (x: 55-115)
  tiles[9][58] = 12; // Final sprint verification dilemma
  tiles[9][60] = 3;

  for (let x = 66; x <= 80; x += 2) {
    tiles[8][x] = 3;
  }

  placePipe(tiles, 92, 9, 4);

  for (let x = 98; x <= 112; x += 2) {
    tiles[8][x] = 2;
    tiles[5][x] = 3;
  }

  // Section 3: Executive Boardroom & Master Presentation Hall (x: 115-165)
  tiles[8][128] = 12; // Friday presentation event
  tiles[8][130] = 15; // Mega espresso bar
  tiles[8][132] = 3;

  for (let x = 140; x <= 156; x += 2) {
    tiles[8][x] = 3;
  }

  // Section 4: Golden Pyramid of 40-Hour Victory & Final Flagpole (x: 165-200)
  placeStairs(tiles, 174, 8, 13, 'up');
  placeFlagpole(tiles, 192, 3, 12);

  return {
    width,
    height,
    theme: 'launchpad',
    levelName: 'Level 5: Friday Finale',
    dayName: 'Friday 04:30 PM - Municipal Signoff, Boardroom Pitch & 40-Hour Delivery',
    timeLimit: 500,
    tiles,
    entities: [
      { type: 'jira_ticket', x: 14 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 26 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'clock_shift', x: 48 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 68 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 86 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'clock_shift', x: 104 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 122 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'bug_enemy', x: 142 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'jira_ticket', x: 160 * TILE_SIZE, y: 12 * TILE_SIZE },
      { type: 'hour_token', x: 8 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'hour_token', x: 20 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 28 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 68 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 76 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 100 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 108 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'hour_token', x: 144 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 152 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'coffee_cup', x: 12 * TILE_SIZE, y: 8 * TILE_SIZE },
      { type: 'coffee_cup', x: 130 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'shield_star', x: 22 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'shield_star', x: 148 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'goggles_item', x: 72 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'life_event_node', x: 58 * TILE_SIZE, y: 8 * TILE_SIZE, properties: { eventId: eventKey } },
      { type: 'life_event_node', x: 128 * TILE_SIZE, y: 7 * TILE_SIZE, properties: { eventId: 'due_date_shift' } },
    ],
  };
}

// =====================================================================
// Hidden Zone 1: Drafting Subway Overtime Cavern (70 Tiles)
// =====================================================================
export function createUndergroundSubway(): TileMap {
  const width = 70;
  const height = 15;
  const tiles = createEmptyGrid(width, height);

  // Ceiling and ground
  for (let x = 0; x < width; x++) {
    tiles[0][x] = 1;
    tiles[1][x] = 1;
    tiles[13][x] = 1;
    tiles[14][x] = 1;
  }

  // Multi-tier token coin lanes
  for (let x = 8; x <= 56; x++) {
    if (x % 3 === 0) {
      tiles[8][x] = 3;
    }
    if (x % 6 === 0) {
      tiles[5][x] = 3;
    }
  }

  // Hidden high platform
  tiles[5][22] = 4;
  tiles[5][24] = 4;
  tiles[5][26] = 4;
  tiles[5][28] = 4;

  // Exit pipe at x=62
  placePipe(tiles, 62, 10, 3, true);

  return {
    width,
    height,
    theme: 'underground',
    levelName: 'Secret Zone: Drafting Studio Basement & Archive',
    dayName: 'Secret Vault - Rapid Design Delivery & Overtime Hour Mining',
    timeLimit: 180,
    tiles,
    entities: [
      { type: 'hour_token', x: 9 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 15 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 21 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 27 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 33 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 39 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 45 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 51 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'coffee_cup', x: 24 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'snack', x: 42 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'shield_star', x: 54 * TILE_SIZE, y: 7 * TILE_SIZE },
    ],
  };
}

// =====================================================================
// Hidden Zone 2: Tropical 2-Week Vacation Island (75 Tiles)
// =====================================================================
export function createTropicalVacationIsland(): TileMap {
  const width = 75;
  const height = 15;
  const tiles = createEmptyGrid(width, height);

  // Sandy beach floor
  for (let x = 0; x < width; x++) {
    tiles[13][x] = 1;
    tiles[14][x] = 1;
  }

  // Palm tree floating leaf platforms
  for (let x = 6; x <= 58; x += 6) {
    tiles[8][x] = 3;
    tiles[8][x + 1] = 3;
    tiles[5][x + 2] = 3;
  }

  // Vacation opportunity event block
  tiles[7][32] = 12;

  // Return warp pipe
  placePipe(tiles, 66, 10, 3, true);

  return {
    width,
    height,
    theme: 'vacation',
    levelName: 'Secret Zone: 2-Week Vacation Paradise',
    dayName: 'Tropical Dream - Rest, Recharge & Morale Sanctuary',
    timeLimit: 200,
    tiles,
    entities: [
      { type: 'life_event_node', x: 32 * TILE_SIZE, y: 6 * TILE_SIZE, properties: { eventId: 'vacation_opportunity' } },
      { type: 'snack', x: 8 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'coffee_cup', x: 18 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 26 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 38 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 46 * TILE_SIZE, y: 4 * TILE_SIZE },
      { type: 'shield_star', x: 52 * TILE_SIZE, y: 7 * TILE_SIZE },
      { type: 'hour_token', x: 58 * TILE_SIZE, y: 7 * TILE_SIZE },
    ],
  };
}

// Master Level Selector
export function getLevelByIndex(index: number, characterRole: CharacterType = 'structure_designer'): TileMap {
  switch (index) {
    case 0:
      return createLevel1(characterRole);
    case 1:
      return createLevel2(characterRole);
    case 2:
      return createLevel3(characterRole);
    case 3:
      return createLevel4(characterRole);
    case 4:
      return createLevel5(characterRole);
    default:
      return createLevel1(characterRole);
  }
}
