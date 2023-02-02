import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsOptional} from "class-validator";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column
    @IsOptional
    id: user;

    @Column
    id: seller;

    @Column({ unique: true})
    text: string;

    @CreateDateColumn()
    createdAt: Date;
}