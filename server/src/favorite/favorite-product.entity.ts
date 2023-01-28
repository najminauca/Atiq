import {Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FavoriteProduct {
    @PrimaryColumn()
    user: string;

    @PrimaryColumn()
    product: string;
}