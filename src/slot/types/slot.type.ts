import { SYMBOL_OBJ } from '../constants/slot.const';

export type ReelSymbol = (typeof SYMBOL_OBJ)[keyof typeof SYMBOL_OBJ];

export type Reel = [ReelSymbol, ReelSymbol, ReelSymbol, ReelSymbol, ReelSymbol];

export type Grid = [Reel, Reel, Reel];
