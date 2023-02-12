import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Chat} from "./chat.entity";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";
import {MessageDto} from "./dto/message.dto";
import {ChatRoom} from "./chat-room.entity";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        @InjectRepository(ChatRoom) private chatRoomRepository: Repository<ChatRoom>
    ) {}

    async createMessage(messageDto: MessageDto, sender: User): Promise<Chat> {
        const query = this.chatRoomRepository.createQueryBuilder('chatRoom')
        query.where({
            senderId: sender.id,
            receiverID: messageDto.receiverID
        }).orWhere({
            senderId: messageDto.receiverID,
            receiverId: sender.id
        })
        const roomQuery = await query.getOne()
        if(roomQuery == null) {
            const room = await this.chatRoomRepository.create({
                user1: sender.id,
                user2: messageDto.receiverID
            })
            await this.chatRoomRepository.save(room)

            const message = this.chatRepository.create({
                chatRoom: room,
                senderID: sender.id,
                text: messageDto.message
            })
            await this.chatRepository.save(message)
            return message
        } else {
            const message = this.chatRepository.create({
                chatRoom: roomQuery,
                senderID: sender.id,
                text: messageDto.message
            })
            await this.chatRepository.save(message)
            return message
        }
    }

    async getMessages(user: User): Promise<ChatRoom[]> {
        const query = this.chatRoomRepository.createQueryBuilder('chatRoom')
        query.where({
            senderId: user.id
        }).orWhere({
            receiverId: user.id
        })
        return query.getMany()
    }
}
