import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicturesEntity } from './picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PicturesEntity])],
  providers: [PictureService],
  controllers: [PictureController],
})
export class PictureModule {}
