import { spin } from './spin';

const n = parseInt(process.argv[2] || '10000000', 10);

let totalStake = 0;
let totalWin = 0;

for (let i = 0; i < n; i++) {
  const stake = (Math.random()*100).toFixed(0)
  totalStake += Number(stake);
  const result = spin(Number(stake));
  totalWin += result.totalWin;
}

const rtp = totalStake > 0 ? ((totalWin / totalStake) * 100).toFixed(2) + '%' : 0;

console.log('Total stake:', totalStake);
console.log('Total win:', totalWin);
console.log('RTP:', rtp);
