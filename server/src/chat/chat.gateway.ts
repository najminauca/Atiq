import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import {ChatService} from "./chat.service";
import { Socket, Server } from 'socket.io';
import {Chat} from "./chat.entity";
import {GetUser} from "../auth/get-user.decorator";
import {MessageDto} from "./dto/message.dto";
import {User} from "../auth/user.entity";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
@UseGuards(AuthGuard('jwt'))
export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private chatService: ChatService) {}

    @WebSocketServer() server: Server;

   @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: MessageDto, @GetUser() user: User): Promise<void> {
        await this.chatService.createMessage(payload, user);
        this.server.emit('recMessage', payload);
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