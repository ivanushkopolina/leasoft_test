export const SYMBOL_OBJ = {
  Ten: '10',
  Jack: 'J',
  Queen: 'Q',
  King: 'K',
  Ace: 'A',
  Wild: 'W',
  Scatter: 'S',
};

export const SYMBOLS = Object.values(SYMBOL_OBJ);

export const SYMBOL_WAIGHTS = {
  [SYMBOL_OBJ.Ten]: 7,
  [SYMBOL_OBJ.Jack]: 6,
  [SYMBOL_OBJ.Queen]: 5,
  [SYMBOL_OBJ.King]: 4,
  [SYMBOL_OBJ.Ace]: 3,
  [SYMBOL_OBJ.Wild]: 2,
  [SYMBOL_OBJ.Scatter]: 1,
};

export const REELS_COUNT = 5;
export const ROWS_COUNT = 3;

export type ReelStrip = readonly string[];

export const REEL_STRIP_LENGTH = 15;

export const REEL_STRIPS: readonly [ReelStrip, ReelStrip, ReelStrip, ReelStrip, ReelStrip] = [
  [
    SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ace, SYMBOL_OBJ.King, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Wild,
    SYMBOL_OBJ.Jack, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ace, SYMBOL_OBJ.King, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Ten,
    SYMBOL_OBJ.Ten, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Jack
  ],
  [
    SYMBOL_OBJ.Jack, SYMBOL_OBJ.Jack, SYMBOL_OBJ.King, SYMBOL_OBJ.Queen, SYMBOL_OBJ.King, SYMBOL_OBJ.Ace,
    SYMBOL_OBJ.King, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Jack, SYMBOL_OBJ.King,
    SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Queen
  ],
  [
    SYMBOL_OBJ.Jack, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Ten,
    SYMBOL_OBJ.Queen, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Jack, SYMBOL_OBJ.King, SYMBOL_OBJ.Ten,
    SYMBOL_OBJ.Jack, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Queen
  ],
  [
    SYMBOL_OBJ.Queen, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Jack,
    SYMBOL_OBJ.Ace, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Jack, SYMBOL_OBJ.King,
    SYMBOL_OBJ.Ace, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Jack
  ],
  [
    SYMBOL_OBJ.King, SYMBOL_OBJ.Queen, SYMBOL_OBJ.King, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Ten, SYMBOL_OBJ.King,
    SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Jack, SYMBOL_OBJ.King,
    SYMBOL_OBJ.Ten, SYMBOL_OBJ.King, SYMBOL_OBJ.Wild
  ],
];

export const PAYTABLE: Record<string, Record<number, number>> = {
  [SYMBOL_OBJ.Ten]: { 3: 1.4, 4: 1.4, 5: 2 },
  [SYMBOL_OBJ.Jack]: { 3: 1.5, 4: 1.6, 5: 2.3 },
  [SYMBOL_OBJ.Queen]: { 3: 1.6, 4: 1.7, 5: 2.6 },
  [SYMBOL_OBJ.King]: { 3: 1.7, 4: 1.9, 5: 3 },
  [SYMBOL_OBJ.Ace]: { 3: 1.8, 4: 2, 5: 4 },
};

export const SCATTER_PAYTABLE: Record<number, number> = {
  3: 2,
  4: 3,
  5: 5,
};

export const PAYING_SYMBOLS = [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Queen, SYMBOL_OBJ.King, SYMBOL_OBJ.Ace];