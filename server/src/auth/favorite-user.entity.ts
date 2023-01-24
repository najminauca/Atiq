import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from '../product/product.entity';
import {User} from "./user.entity";

@Entity()
export class FavoriteUser {
    @PrimaryColumn()
    user: User;

    @PrimaryColumn()
    seller: User;
}