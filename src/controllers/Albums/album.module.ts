import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { SharedModule } from 'src/Shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
