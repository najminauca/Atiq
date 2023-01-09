import { PriceStatus } from './price-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum } from 'class-validator';
import { User } from '../auth/user.entity';
import {Exclude} from "class-transformer";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //Fremdschulssel für seller

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'enum', enum: PriceStatus, default: PriceStatus.FIXED })
  @IsEnum(PriceStatus)
  priceStatus: PriceStatus;



  @ManyToOne((type) => User, (user) => user.product, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
