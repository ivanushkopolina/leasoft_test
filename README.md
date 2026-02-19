# Slot (простий запуск)

Просте консольне застосунок без фреймворків: два скрипти — **run** (спіни з обмеженням) та **stats** (статистика з N спінів).

## Скрипти

```bash
npm install
```

**run** — спін за спином з обмеженням кількості:

```bash
npm run run -- 1000
```

**stats** — N спінів, виводить загальну ставку, загальний виграш, RTP:

```bash
npm run stats -- 50000
```

## Структура

- `src/config.ts` — рил сет (number[][]), paytable по id, wild/scatter id.
- `src/grid.ts` — побудова сітки: для кожного reel
- `src/evaluate.ts` — ways-оцінка за symbol id.
- `src/spin.ts` — один спін (grid + evaluate).
- `src/run.ts` — скрипт run.
- `src/stats.ts` — скрипт stats.

## ID символів (в коментарях)

- 1–5: платні символи
- 6: wild
- 7: scatter
