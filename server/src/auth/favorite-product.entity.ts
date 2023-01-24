import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from '../product/product.entity';
import {User} from "./user.entity";
import {IsOptional} from "class-validator";

@Entity()
export class FavoriteProduct {
    @PrimaryColumn()
    user: string;

    @PrimaryColumn()
    product: string;
}