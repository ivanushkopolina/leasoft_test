import { Test, TestingModule } from '@nestjs/testing';
import { REELS_COUNT, ROWS_COUNT, SYMBOLS } from '../constants/slot.const';
import { SlotService } from './slot.service';
import { SpinIndexService } from './spin-index.service';

const defaultStake = 1;

describe('SlotService', () => {
  let service: SlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotService, SpinIndexService],
    }).compile();

    service = module.get<SlotService>(SlotService);
  });

  describe('spin', () => {
    it('returns an object with grid, seed, spinIndex, wins and totalWin', () => {
      const result = service.spin(1, defaultStake);
      expect(result).toHaveProperty('grid');
      expect(result).toHaveProperty('seed');
      expect(result).toHaveProperty('spinIndex');
      expect(result.grid).toBeDefined();
      expect(Array.isArray(result.wins)).toBe(true);
      expect(typeof result.totalWin).toBe('number');
    });

    it('returns grid with 3 rows', () => {
      const { grid } = service.spin(1, defaultStake);
      expect(grid).toHaveLength(ROWS_COUNT);
    });

    it('each reel has 5 symbols', () => {
      const { grid } = service.spin(1, defaultStake);
      grid.forEach((reel) => {
        expect(reel).toHaveLength(REELS_COUNT);
      });
    });

    it('every symbol is valid', () => {
      const { grid } = service.spin(1, defaultStake);
      for (const reel of grid) {
        for (const symbol of reel) {
          expect(SYMBOLS).toContain(symbol);
        }
      }
    });

    it('spinIndex increments per user', () => {
      expect(service.spin(100, defaultStake).spinIndex).toBe(0);
      expect(service.spin(100, defaultStake).spinIndex).toBe(defaultStake);
      expect(service.spin(100, defaultStake).spinIndex).toBe(2);
      expect(service.spin(200, defaultStake).spinIndex).toBe(0);
    });

    it('multiple spins produce valid grids', () => {
      for (let i = 0; i < 10; i++) {
        const { grid } = service.spin(1, defaultStake);
        expect(grid).toHaveLength(ROWS_COUNT);
        grid.forEach((reel) => {
          expect(reel).toHaveLength(REELS_COUNT);
          reel.forEach((s) => expect(SYMBOLS).toContain(s));
        });
      }
    });
  });
});
