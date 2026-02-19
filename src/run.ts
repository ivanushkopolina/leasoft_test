import { spin } from './spin';

const limit = parseInt(process.argv[2] || '10000000', 10);
const stake = 1;

for (let i = 0; i < limit; i++) {
  const result = spin(stake);
  if (result.wins.length > 0) {
    console.log(`Spin ${i + 1}: win ${result.totalWin}`);
  }
}
