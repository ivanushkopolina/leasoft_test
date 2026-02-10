export function seedFromPlayerAndSpin(userId: number, spinIndex: number): number {
  const seed = `${userId}:${spinIndex}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) >>> 0;
  }
  return h || 1;
}
