import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  /*@Column()
  name: string;

  @Column()
  lastname: string;*/

  @Column({ default: false })
  role: boolean;

  @OneToMany((type) => Product, (product) => product.user, { eager: true })
  product: Product[];

  @ManyToMany(() => Product)
  @JoinTable()
  favoriteProducts: Product[];

  @ManyToMany(() => User)
  @JoinTable()
  favoriteSellers: User[];
}
