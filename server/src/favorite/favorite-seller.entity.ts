import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FavoriteSeller {
    @PrimaryColumn()
    user: string;

    @PrimaryColumn()
    seller: string;
}