import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import {Server, Socket} from "socket.io";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";
import {Body} from "@nestjs/common";
import {ChatRoomDto} from "./dto/chatroom.dto";
import {SendMessageDto} from "./dto/send-message.dto";
import {Message} from "./entities/message.entity";
import {CreateMessageDto} from "./dto/create-message.dto";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    @MessageBody() message: CreateMessageDto,
    @GetUser() user: User,
  ): Promise<Message> {
    //this.server.emit('message', message);
    return this.messagesService.createMessage(message, user);
  }

  @SubscribeMessage('openRoom')
  async openRoom(@Body() room: ChatRoomDto) {
    return this.messagesService.openRoom(room);
  }

  @SubscribeMessage('getAllChatroom')
  async getAllChatRoom(@GetUser() user: User): Promise<ChatRoomDto[]> {
    return this.messagesService.getAllChatRoom(user);
  }

  @SubscribeMessage('getAllMessage')
  async getAllMessage(@Body() room: ChatRoomDto): Promise<SendMessageDto[]> {
    return this.messagesService.getMessages(room);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}
