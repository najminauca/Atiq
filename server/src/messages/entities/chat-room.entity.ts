import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "../../auth/user.entity";
import {Message} from "./message.entity";

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Message, (message) => message.room, {eager: true})
    messages: Message[];

    @ManyToOne(() => User, (user) => user.roomConnection1, {eager:false})
    @JoinColumn()
    user1: User;

    @ManyToOne(() => User, (user) => user.roomConnection2, {eager:false})
    @JoinColumn()
    user2: User
}