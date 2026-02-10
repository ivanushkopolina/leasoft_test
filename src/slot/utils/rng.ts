export interface IRng {
  nextFloat(): number;
}

// @TODO make rng deterministic
export function createRng(): IRng {
  return {
    nextFloat(): number {
      return Math.random();
    }
  };
}