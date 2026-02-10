import { Injectable } from '@nestjs/common';

@Injectable()
export class SpinIndexService {
  private readonly counts = new Map<number, number>();

  getAndIncrement(userId: number): number {
    const current = this.counts.get(userId) ?? 0;
    this.counts.set(userId, current + 1);
    return current;
  }

  get(userId: number): number {
    return this.counts.get(userId) ?? 0;
  }
}
