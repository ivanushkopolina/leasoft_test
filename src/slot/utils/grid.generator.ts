import { createRng, type IRng } from '../utils/rng';
import type { Grid, ReelSymbol } from '../types/slot.type';
import { SYMBOL_OBJ, SYMBOL_WAIGHTS } from '../constants/slot.const';

export function generateGrid() {
  const rng = createRng();

  const grid: Grid = [
    [pickSymbol(rng), pickSymbol(rng), pickSymbol(rng), pickSymbol(rng), pickSymbol(rng)],
    [pickSymbol(rng), pickSymbol(rng), pickSymbol(rng), pickSymbol(rng), pickSymbol(rng)],
    [pickSymbol(rng), pickSymbol(rng), pickSymbol(rng), pickSymbol(rng), pickSymbol(rng)],
  ];

  return grid;
}

function pickSymbol(rng: IRng): ReelSymbol {
  const symbols = Object.keys(SYMBOL_OBJ) as Array<keyof typeof SYMBOL_OBJ>;
  const totalWeight = symbols.reduce((sum, key) => sum + SYMBOL_WAIGHTS[SYMBOL_OBJ[key]], 0);

  let r = rng.nextFloat() * totalWeight;
  
  for (const key of symbols) {
    const w = SYMBOL_WAIGHTS[SYMBOL_OBJ[key]];
    r -= w;
    if (r <= 0) return SYMBOL_OBJ[key] as ReelSymbol;
  }
  return SYMBOL_OBJ[symbols[symbols.length - 1]] as ReelSymbol;
}