import { Module } from '@nestjs/common';
import { VotingService } from './voting.service';
import { VotingController } from './voting.controller';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  controllers: [VotingController],
  providers: [VotingService],
  imports: [AuditModule],
})
export class VotingModule {}
