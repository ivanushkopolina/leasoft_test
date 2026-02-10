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