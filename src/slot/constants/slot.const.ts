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

// symbol => count => multiplier
export const PAYTABLE: Record<string, Record<number, number>> = {
  [SYMBOL_OBJ.Ten]: { 3: 2, 4: 5, 5: 10 },
  [SYMBOL_OBJ.Jack]: { 3: 4, 4: 10, 5: 25 },
  [SYMBOL_OBJ.Queen]: { 3: 6, 4: 15, 5: 40 },
  [SYMBOL_OBJ.King]: { 3: 8, 4: 20, 5: 50 },
  [SYMBOL_OBJ.Ace]: { 3: 10, 4: 25, 5: 100 },
};

export const SCATTER_PAYTABLE: Record<number, number> = {
  3: 5,
  4: 20,
  5: 100,
};

export const PAYING_SYMBOLS = [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Queen, SYMBOL_OBJ.King, SYMBOL_OBJ.Ace];