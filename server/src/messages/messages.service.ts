import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ChatRoom} from "./entities/chat-room.entity";
import {User} from "../auth/user.entity";
import {ChatRoomDto} from "./dto/chatroom.dto";
import {SendMessageDto} from "./dto/send-message.dto";
import {CreateMessageDto} from "./dto/create-message.dto";
import {Message} from "./entities/message.entity";

@Injectable()
export class MessagesService {
  constructor(
      @InjectRepository(Message) private messageRepo: Repository<Message>,
      @InjectRepository(ChatRoom) private chatRoomRepository: Repository<ChatRoom>,
      @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async createMessage(
    messageDto: CreateMessageDto,
    sender: User,
  ): Promise<Message> {
    const room = await this.chatRoomRepository.findOne({
      where: {
        id: messageDto.room,
      },
    });
    const message = await this.messageRepo.create({
      room: room,
      sender: sender,
      text: messageDto.message,
    });

    return await this.messageRepo.save(message);
  }

  async openRoom(room: ChatRoomDto): Promise<ChatRoom> {
    const user1 = await this.userRepo.findOne({
      where: {
        id: room.user1,
      },
    });
    const user2 = await this.userRepo.findOne({
      where: {
        id: room.user2,
      },
    });
    const findRoom = await this.chatRoomRepository.createQueryBuilder('room')
        .leftJoinAndSelect('room.user1', 'user1')
        .leftJoinAndSelect('room.user2', 'user2')
        .where({
          user1: user1,
          user2: user2,
        }).orWhere({
          user1: user2,
          user2: user1,
        }).getOne()
    if (findRoom == null) {
      const newRoom = await this.chatRoomRepository.create({
        user1: user1,
        user2: user2,
      });
      await this.chatRoomRepository.save(newRoom);
      return newRoom;
    }
    return findRoom;
  }

  async getMessages(room: ChatRoomDto): Promise<SendMessageDto[]> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: {
        id: room.id,
      },
    });
    const messages: Message[] = await this.messageRepo
      .createQueryBuilder('message')
        .leftJoinAndSelect('message.sender', 'sender')
        .where({
          room: chatRoom
        }).orderBy('message.createdAt', 'ASC').getMany()
    const messagesDto: SendMessageDto[] = messages.map((message) => {
      const sender = message.sender;
      return new SendMessageDto(sender.id, message.text);
    });
    return messagesDto;
  }

  async getAllChatRoom(user: User): Promise<ChatRoomDto[]> {
    const rooms: ChatRoom[] = await this.chatRoomRepository
      .createQueryBuilder('rooms')
        .leftJoinAndSelect('rooms.user1', 'user1')
        .leftJoinAndSelect('rooms.user2', 'user2')
        .where({
          user1: user
        }).orWhere({
          user2: user
        }).getMany()

    const roomDto: ChatRoomDto[] = rooms.map((room) => {
      return new ChatRoomDto(room.id, room.user1.id, room.user2.id);
    });

    return roomDto;
  }
}
