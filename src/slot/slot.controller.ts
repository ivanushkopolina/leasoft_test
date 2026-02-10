import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { SlotService } from './services/slot.service';
import { SpinQueryReqDto } from './dtos/spin-query.req.dto';

export interface RequestWithUser extends Request {
  user?: { id: number };
}

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get('spin')
  spin(@Req() req: RequestWithUser, @Query() query: SpinQueryReqDto) {
    const userId = req.user?.id;
    // const stakePerLine = query.stake ? Math.max(0, Number(query.stake)) : 1;
    return this.slotService.spin(userId);
  }
}