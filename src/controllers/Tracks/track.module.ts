import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { SharedModule } from 'src/Shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
