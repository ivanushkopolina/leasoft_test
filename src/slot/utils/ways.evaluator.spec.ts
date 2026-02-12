import { PAYTABLE, SCATTER_PAYTABLE, SYMBOL_OBJ } from '../constants/slot.const';
import type { Grid } from '../types/slot.type';
import { evaluateWays } from './ways.evaluator';

const defaultBet = 1;

describe('evaluateWays', () => {
  it('pays for 5 of a kind left to right', () => {
    const grid: Grid = [
      [SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Jack, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Jack],
    ];
    const result = evaluateWays(grid, defaultBet);
    expect(result.wins.length).toBeGreaterThan(0);
    const aceWin = result.wins.find((w) => w.symbol === SYMBOL_OBJ.Ace && w.count === 5);
    expect(aceWin).toBeDefined();
    expect(aceWin!.amount).toBe(PAYTABLE[SYMBOL_OBJ.Ace][5]);

    expect(result.totalWin).toBeGreaterThan(0);
  });

  it('pays the biggest multiplier of the combination win(4 Tens)', () => {
    const grid: Grid = [
      [SYMBOL_OBJ.King, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Ace],
      [SYMBOL_OBJ.King, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Jack],
    ];
    const result = evaluateWays(grid, defaultBet);
    expect(result.wins.length).toBeGreaterThan(0);
    const tenWin = result.wins.find((w) => w.symbol === SYMBOL_OBJ.Ten && w.count === 4);
    expect(tenWin).toBeDefined();
    expect(result.totalWin).toBe(defaultBet * PAYTABLE[SYMBOL_OBJ.Ten][4]);
  });

  it('pays for 3 scatters anywhere', () => {
    const grid: Grid = [
      [SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Scatter, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
    ];
    const result = evaluateWays(grid, defaultBet);
    const scatterWin = result.wins.find((w) => w.symbol === SYMBOL_OBJ.Scatter);
    expect(scatterWin).toBeDefined();
    expect(scatterWin!.count).toBe(3);
    expect(scatterWin!.amount).toBe(defaultBet * SCATTER_PAYTABLE[3]);
  });

  it('Wild substitutes for pay symbol', () => {
    const grid: Grid = [
      [SYMBOL_OBJ.Ace, SYMBOL_OBJ.Wild, SYMBOL_OBJ.Wild, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
    ];
    const result = evaluateWays(grid, defaultBet);
    const aceWin = result.wins.find((w) => w.symbol === SYMBOL_OBJ.Ace);
    expect(aceWin).toBeDefined();
    expect(aceWin!.count).toBe(3);
  });

  it('no win when symbol breaks on second reel', () => {
    const grid: Grid = [
      [SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten],
    ];
    const result = evaluateWays(grid, defaultBet);
    const aceWin = result.wins.find((w) => w.symbol === SYMBOL_OBJ.Ace);
    expect(aceWin).toBeUndefined();
  });

  it('Wild should substitute for bigger symbol if wild is after the bigger symbol', () => {
    const grid: Grid = [
      [SYMBOL_OBJ.Wild, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Wild, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Scatter],
    ];
    const result = evaluateWays(grid, defaultBet);
    console.log(result.wins);
    expect(result.wins.length).toBeGreaterThan(0);

    const aceWin = result.wins.find((w) => w.symbol === SYMBOL_OBJ.Ace && w.count === 4);
    expect(aceWin).toBeDefined();
    expect(aceWin!.amount).toBe(PAYTABLE[SYMBOL_OBJ.Ace][4]);

    expect(result.totalWin).toBeGreaterThan(0);
  });

  it('Wild should substitute for bigger symbol if wild is before the bigger symbol', () => {
    const grid: Grid = [
      [SYMBOL_OBJ.Wild, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ten, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ten, SYMBOL_OBJ.Queen, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Ten],
      [SYMBOL_OBJ.Ace, SYMBOL_OBJ.Ace, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Jack, SYMBOL_OBJ.Scatter],
    ];
    const result = evaluateWays(grid, defaultBet);
    expect(result.wins.length).toBeGreaterThan(0);
    console.log(result.wins);
    const aceWin = result.wins.find((w) => w.symbol === SYMBOL_OBJ.Ace && w.count === 4);
    expect(aceWin).toBeDefined();
    expect(aceWin!.amount).toBe(PAYTABLE[SYMBOL_OBJ.Ace][4]);

    expect(result.totalWin).toBeGreaterThan(0);
  });
});
