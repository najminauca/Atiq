import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';
import {FavoriteProduct} from "../favorite/favorite-product.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: 'fixed' })
  priceStatus: string;

  @ManyToOne((type) => User, (user) => user.product, { eager: false })
  @Exclude({ toPlainOnly: true })
  seller: User;

  @OneToMany((type) => FavoriteProduct, (product) => product.product, { eager: true })
  favored: Product[];
}
