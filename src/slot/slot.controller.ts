import { Controller, Get } from '@nestjs/common';
import { SlotService } from './services/slot.service';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get('spin')
  spin() {
    return this.slotService.spin();
  }
}