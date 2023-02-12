import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsOptional} from "class-validator";
import {type} from "os";
import {ChatRoom} from "./chat-room.entity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne((type) => ChatRoom, (chatRoom) => chatRoom.messages, {eager: false})
    chatRoom: ChatRoom

    @Column()
    senderID: string;

    @Column({ unique: true})
    text: string;

    @CreateDateColumn()
    createdAt: Date;
}