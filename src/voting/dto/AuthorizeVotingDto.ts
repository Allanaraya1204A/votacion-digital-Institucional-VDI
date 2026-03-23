import { IsInt, Min } from 'class-validator';

export class AuthorizeVotingDto {
  @IsInt()
  @Min(1)
  estudiante_id: number;

  @IsInt()
  @Min(1)
  dispositivo_id: number;
}