import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { VotingService } from './voting.service';
import { AuthorizeVotingDto } from './dto/AuthorizeVotingDto';
import { CastVoteDto } from './dto/CastVoteDto';
import { Roles } from 'src/aut/decorators/roles.decorator';



@Controller('voting')
export class VotingController {
  constructor(private readonly votingService: VotingService) { }

  //  Autorizar voto
  @Roles('SUPERVISOR', 'ADMIN')
  @Post('authorize')
  authorize(@Body() dto, @Req() req) {
    const userId = req.user.sub;

    return this.votingService.authorizeVoting(
      dto.estudiante_id,
      dto.dispositivo_id,
      userId
    );
  }

  // Emitir voto

  @Post('cast')
  castVote(@Body() dto: CastVoteDto) {
    return this.votingService.castVote(
      dto.candidatura_id,
      dto.dispositivo_id,
    );
  }

  // Obtener resultados
  @Roles('ADMIN') 
  @Get('results')
  getResults() {
    return this.votingService.getResults();
  }
}