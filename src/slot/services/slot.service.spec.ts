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

    it('RTP over many spins is within expected range for the same user', () => {
      const userId = 1;
      const stakePerSpin = 1;
      const spinsCount = 10_000_000;
      let totalPayout = 0;
      let loseCount = 0;
      const streakCounts: Record<string, Record<number, number>> = {};

      for (let i = 0; i < spinsCount; i++) {
        const result = service.spin(userId, stakePerSpin);
        totalPayout += result.totalWin;

        for (const win of result.wins) {
          if (!streakCounts[win.symbol]) {
            streakCounts[win.symbol] = {};
          }
          if(result.totalWin === 0) loseCount++;
          const byCount = streakCounts[win.symbol];
          byCount[win.count] = (byCount[win.count] ?? 0) + 1;
        }
      }

      const totalStake = spinsCount * stakePerSpin;
      const rtp = totalPayout / totalStake;


      // Uncomment to see streak counts example: (
      // A: {3: 123000, 4: 70000, 5: 6000}, 
      // J: {3: 100000, 4: 50000, 5: 4000}, 
      // Q: {3: 80000, 4: 40000, 5: 3000},
      //  K: {3: 60000, 4: 30000, 5: 2000}, 
      // 10: {3: 40000, 4: 20000, 5: 1000}, 
      // W: {3: 20000, 4: 10000, 5: 500}, 
      // S: {3: 10000, 4: 5000, 5: 250}})
      // console.log('Streak counts:', streakCounts);

      // log to see actual loses
      expect(loseCount).toBeGreaterThan(300000);

      expect(rtp).toBeGreaterThanOrEqual(0.93);
      expect(rtp).toBeLessThanOrEqual(0.98);
    });
  });
});
