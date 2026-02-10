import { Injectable } from '@nestjs/common';
import type { Grid } from '../types/slot.type';
import { generateGrid } from '../utils/grid.generator';
import { seedFromPlayerAndSpin } from '../utils/seed.generator';
import { SpinIndexService } from './spin-index.service';

@Injectable()
export class SlotService {
  constructor(private readonly spinIndexService: SpinIndexService) {}

  spin(userId: number): { grid: Grid; seed: number; spinIndex: number } {
    const effectiveUserId = userId;
    const spinIndex = this.spinIndexService.getAndIncrement(effectiveUserId);
    const seed = seedFromPlayerAndSpin(effectiveUserId, spinIndex);
    const grid = generateGrid(seed);

    return { grid, seed, spinIndex };
  }
}
