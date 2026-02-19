import { REELS, ROWS, REELS_COUNT, REEL_LENGTH } from './config';

export type Grid = number[][];

export function buildGrid(): Grid {
  const grid: Grid = [];
  for (let row = 0; row < ROWS; row++) {
    grid[row] = [];
    for (let reel = 0; reel < REELS_COUNT; reel++) {
      const strip = REELS[reel];
      const stop = Math.floor(Math.random() * REEL_LENGTH);
      const index = (stop + REEL_LENGTH) % REEL_LENGTH;
      grid[row][reel] = strip[index];
    }
  }
  return grid;
}
