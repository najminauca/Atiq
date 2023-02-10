import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class PicturesEntity {
  @IsString()
  @PrimaryColumn()
  picture: string;

  @IsString()
  @Column()
  product: string;
}
