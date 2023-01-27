import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from '../product/product.entity';
import {User} from "./user.entity";

@Entity()
export class FavoriteSeller {
    @PrimaryColumn()
    user: string;

    @PrimaryColumn()
    seller: string;
}