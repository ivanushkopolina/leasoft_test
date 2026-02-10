import { Injectable } from '@nestjs/common';
import type { Grid } from '../types/slot.type';
import { generateGrid } from '../utils/grid.generator';

@Injectable()
export class SlotService {
  spin(): { grid: Grid } {
    const grid = generateGrid();

    return { grid };
  }
}
