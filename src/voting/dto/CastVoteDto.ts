import { IsInt, Min } from 'class-validator';

export class CastVoteDto {
  @IsInt()
  @Min(1)
  candidatura_id: number;

  @IsInt()
  @Min(1)
  dispositivo_id: number;
}