import { PAYING_SYMBOLS, PAYTABLE, REELS_COUNT, ROWS_COUNT, SCATTER_PAYTABLE, SYMBOL_OBJ } from '../constants/slot.const';
import type { Grid, WinLine, WinResult } from '../types/slot.type';

export function evaluateWays(grid: Grid, stakePerLine: number): WinResult {
  const winCombinations: WinLine[] = [];

  let biggestWin: WinLine | null = null;
  for (const symbol of PAYING_SYMBOLS) {
    const count = countSymbolStreak(grid, symbol);
    const mult = PAYTABLE[symbol]?.[count];
    if (mult) {
      const win = { symbol, count, amount: mult * stakePerLine, mult }
      winCombinations.push(win);
      if(mult > (biggestWin?.mult ?? 0)) {
        biggestWin = win;
      }
    }
  }

  const scatterCount = countScatters(grid);
  const scatterMult = SCATTER_PAYTABLE[scatterCount];
  let scatterWin: WinLine | null = null;
  if (scatterMult) {
    const scatterWinObj = { symbol: SYMBOL_OBJ.Scatter, count: scatterCount, amount: scatterMult * stakePerLine, mult: scatterMult };
    winCombinations.push(scatterWinObj);
    if(scatterMult > biggestWin?.mult) {
      scatterWin = scatterWinObj;
    }
  }

  return { wins: winCombinations, totalWin: biggestWin?.amount ?? 0, scatterWin: scatterWin?.amount ?? 0 }
}

function countSymbolStreak(grid: Grid, symbol: string): number {
  let count = 0;
  for (let r = 0; r < REELS_COUNT; r++) {
    const hasMatch = reelHasSymbolOrWild(grid, r, symbol);
    if (!hasMatch) break;
    count++;
  }
  return count;
}

function reelHasSymbolOrWild(grid: Grid, reel: number, symbol: string): boolean {
  for (let row = 0; row < ROWS_COUNT; row++) {
    const s = grid[row][reel];
    if (s === symbol || s === SYMBOL_OBJ.Wild) return true;
  }
  return false;
}

function countScatters(grid: Grid): number {
  let n = 0;
  for (let row = 0; row < ROWS_COUNT; row++) {
    for (let r = 0; r < REELS_COUNT; r++) {
      if (grid[row][r] === SYMBOL_OBJ.Scatter) n++;
    }
  }
  return n;
}
