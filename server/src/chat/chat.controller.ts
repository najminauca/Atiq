import {Controller, Get, Post, Render, Res, UseGuards} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {Chat} from "./chat.entity";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";
import {MessageDto} from "./dto/message.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('/chat')
    @Render('index')
    Home() {
        return;
    }

    @Get('/api/chat')
    async Chat(@Res() res, @GetUser() user: User) {
        const message =  await this.chatService.getMessages(user)
        res.json(message)
    }

    @Post('/send')
    async createMessage(messageDto: MessageDto, @GetUser() user: User): Promise<Chat> {
        return this.chatService.createMessage(messageDto, user)
    }
}
