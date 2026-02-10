import { Module } from '@nestjs/common';
import { SlotController } from './slot.controller';
import { SlotService } from './services/slot.service';

@Module({
  imports: [],
  controllers: [SlotController],
  providers: [SlotService],
})
export class SlotModule {}