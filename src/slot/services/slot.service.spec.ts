import { Test, TestingModule } from '@nestjs/testing';
import { REELS_COUNT, ROWS_COUNT, SYMBOLS } from '../constants/slot.const';
import { SlotService } from './slot.service';

describe('SlotService', () => {
  let service: SlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotService],
    }).compile();

    service = module.get<SlotService>(SlotService);
  });

  describe('spin', () => {
    it('returns an object with grid', () => {
      const result = service.spin();
      expect(result).toHaveProperty('grid');
      expect(result.grid).toBeDefined();
    });

    it('returns grid with 3 rows', () => {
      const { grid } = service.spin();
      expect(grid).toHaveLength(ROWS_COUNT);
    });

    it.only('each reel has 5 symbols', () => {
      const { grid } = service.spin();
      console.log(11111, grid);
      grid.forEach((reel, i) => {
        expect(reel).toHaveLength(REELS_COUNT);
      });
    });

    it('every symbol is valid', () => {
      const { grid } = service.spin();
      for (const reel of grid) {
        for (const symbol of reel) {
          expect(SYMBOLS).toContain(symbol);
        }
      }
    });

    it('multiple spins produce valid grids', () => {
      for (let i = 0; i < 10; i++) {
        const { grid } = service.spin();
        expect(grid).toHaveLength(ROWS_COUNT);
        grid.forEach((reel) => {
          expect(reel).toHaveLength(REELS_COUNT);
          reel.forEach((s) => expect(SYMBOLS).toContain(s));
        });
      }
    });
  });
});
