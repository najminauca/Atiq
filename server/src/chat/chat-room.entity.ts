import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsOptional} from "class-validator";
import {Chat} from "./chat.entity";

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany((type) => Chat, (chat) => chat.chatRoom, {eager: true})
    messages: Chat[]

    @Column()
    user1: string;

    @Column()
    user2: string;
}