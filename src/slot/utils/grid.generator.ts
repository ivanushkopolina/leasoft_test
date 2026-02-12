import { createSeededRng, type IRng } from '../utils/rng';
import type { Grid, ReelSymbol } from '../types/slot.type';
import { REEL_STRIPS, REEL_STRIP_LENGTH, REELS_COUNT, ROWS_COUNT } from '../constants/slot.const';

export function generateGrid(seed: number): Grid {
  const rng = createSeededRng(seed);

  const grid: Grid = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ] as Grid;

  for (let reel = 0; reel < REELS_COUNT; reel++) {
    const stop = rng.nextInt(REEL_STRIP_LENGTH);
    const strip = REEL_STRIPS[reel];

    grid[0][reel] = strip[(stop - 1) % REEL_STRIP_LENGTH] as ReelSymbol;
    grid[1][reel] = strip[stop % REEL_STRIP_LENGTH] as ReelSymbol;
    grid[2][reel] = strip[(stop + 1) % REEL_STRIP_LENGTH] as ReelSymbol;
  }

  return grid;
}
