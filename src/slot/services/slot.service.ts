import { Injectable } from '@nestjs/common';

@Injectable()
export class SlotService {
  spin() {
    return 'lucky spin';
  }
}