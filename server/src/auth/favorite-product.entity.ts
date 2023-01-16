import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from '../product/product.entity';
import {User} from "./user.entity";

@Entity()
export class FavoriteProduct {
    @Column()
    user: User;

    @Column()
    product: Product;
}