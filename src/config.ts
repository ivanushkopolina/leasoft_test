export const ROWS = 3;
export const REELS_COUNT = 5;
export const REEL_LENGTH = 15;

export const REELS: number[][] = [
  [1, 5, 2, 7, 3, 6, 2, 1, 5, 4, 3, 1, 1, 3, 2],
  [2, 2, 4, 3, 4, 5, 4, 7, 1, 1, 2, 4, 5, 1, 3],
  [2, 1, 1, 2, 3, 1, 3, 5, 7, 2, 4, 1, 2, 2, 3],
  [3, 2, 1, 1, 3, 2, 5, 3, 2, 5, 2, 4, 5, 7, 2],
  [4, 3, 4, 7, 1, 4, 5, 1, 3, 3, 2, 4, 1, 4, 6],
];

export const PAYING_IDS = [1, 2, 3, 4, 5];
export const WILD_ID = 6;
export const SCATTER_ID = 7;

export const PAYTABLE: Record<number, Record<number, number>> = {
  1: { 3: 1.4, 4: 1.4, 5: 2 },
  2: { 3: 1.5, 4: 1.6, 5: 2.3 },
  3: { 3: 1.6, 4: 1.7, 5: 2.6 },
  4: { 3: 1.7, 4: 1.9, 5: 3 },
  5: { 3: 1.8, 4: 2, 5: 4 },
};

export const SCATTER_PAYTABLE: Record<number, number> = {
  3: 2,
  4: 3,
  5: 5,
};
