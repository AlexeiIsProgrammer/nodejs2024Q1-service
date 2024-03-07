import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { SharedModule } from 'src/Shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
