import { Injectable } from '@nestjs/common';
import type { Grid, WinResult } from '../types/slot.type';
import { generateGrid } from '../utils/grid.generator';
import { seedFromPlayerAndSpin } from '../utils/seed.generator';
import { evaluateWays } from '../utils/ways.evaluator';
import { SpinIndexService } from './spin-index.service';

@Injectable()
export class SlotService {
  constructor(private readonly spinIndexService: SpinIndexService) {}

  spin(userId: number, stakePerLine: number): { grid: Grid; seed: number; spinIndex: number } & WinResult {
    const spinIndex = this.spinIndexService.getAndIncrement(userId);
    const seed = seedFromPlayerAndSpin(userId, spinIndex);
    const grid = generateGrid(seed);
    const { wins, totalWin, scatterWin } = evaluateWays(grid, stakePerLine);

    return { grid, seed, spinIndex, wins, totalWin, scatterWin };
  }
}
