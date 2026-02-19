import {
  PAYTABLE,
  PAYING_IDS,
  SCATTER_PAYTABLE,
  SCATTER_ID,
  WILD_ID,
  REELS_COUNT,
  ROWS,
} from './config';
import type { Grid } from './grid';

export interface WinLine {
  symbol: number;
  count: number;
  amount: number;
}

export interface SpinResult {
  wins: WinLine[];
  totalWin: number;
}

export function evaluateWays(grid: Grid, stake: number): SpinResult {
  const wins: WinLine[] = [];
  let biggestAmount = 0;

  for (const symbolId of PAYING_IDS) {
    const count = countConsecutiveReelsWithSymbolOrWild(grid, symbolId);
    const mult = PAYTABLE[symbolId]?.[count];
    if (mult != null) {
      const amount = mult * stake;
      wins.push({ symbol: symbolId, count, amount });
      if (amount > biggestAmount) biggestAmount = amount;
    }
  }

  const scatterCount = countScatters(grid);
  const scatterMult = SCATTER_PAYTABLE[scatterCount];
  if (scatterMult != null) {
    const amount = scatterMult * stake;
    wins.push({ symbol: SCATTER_ID, count: scatterCount, amount });
    if (amount > biggestAmount) biggestAmount = amount;
  }

  return { wins, totalWin: biggestAmount };
}

function countConsecutiveReelsWithSymbolOrWild(grid: Grid, symbolId: number): number {
  let count = 0;
  for (let r = 0; r < REELS_COUNT; r++) {
    if (!reelHasSymbolOrWild(grid, r, symbolId)) break;
    count++;
  }
  return count;
}

function reelHasSymbolOrWild(grid: Grid, reel: number, symbolId: number): boolean {
  for (let row = 0; row < ROWS; row++) {
    const id = grid[row][reel];
    if (id === symbolId || id === WILD_ID) return true;
  }
  return false;
}

function countScatters(grid: Grid): number {
  let n = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let r = 0; r < REELS_COUNT; r++) {
      if (grid[row][r] === SCATTER_ID) n++;
    }
  }
  return n;
}
