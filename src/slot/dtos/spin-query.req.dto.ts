import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class SpinQueryReqDto {
    @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(1000)
    stake?: number;
}