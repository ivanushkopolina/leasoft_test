import { buildGrid } from './grid';
import { evaluateWays } from './ways.evaluator';

export interface SpinOutput {
  grid: number[][];
  wins: { symbol: number; count: number; amount: number }[];
  totalWin: number;
}

export function spin(stake: number): SpinOutput {
  const grid = buildGrid();
  const { wins, totalWin } = evaluateWays(grid, stake);
  return { grid, wins, totalWin };
}
