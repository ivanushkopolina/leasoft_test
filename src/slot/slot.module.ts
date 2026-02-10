import { Module } from '@nestjs/common';
import { SlotController } from './slot.controller';
import { SlotService } from './services/slot.service';
import { SpinIndexService } from './services/spin-index.service';

@Module({
  imports: [],
  controllers: [SlotController],
  providers: [SlotService, SpinIndexService],
})
export class SlotModule {}