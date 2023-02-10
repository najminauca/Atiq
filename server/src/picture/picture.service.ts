import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PicturesEntity } from './picture.entity';
import { Repository } from 'typeorm';
import {PictureDto} from "./dto/picture.dto";


@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(PicturesEntity)
    private picturesRepository: Repository<PicturesEntity>,
  ) {}

  async savePicture(picture: string, addPictDto: PictureDto): Promise<void> {
    const { product } = addPictDto;
    const pictures = this.picturesRepository.create({
      picture: picture,
      product: product,
    });
    try {
      await this.picturesRepository.save(pictures);
    } catch (e) {
      throw new InternalServerErrorException('server error');
    }
  }

  async deletePicture(delPictDto: PictureDto): Promise<void> {
    const{ picture, product } = delPictDto;
    await this.picturesRepository.delete({
      picture: picture,
      product: product,
    });
  }

  async getPictures(id: string): Promise<PicturesEntity[]> {

    const pictures = await this.picturesRepository.find({
      where: {
        product: id,
      },
    });

    return pictures;
  }
}
