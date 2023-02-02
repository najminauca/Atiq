import {Controller, Get, Render, Res} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {Chat} from "./chat.entity";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('/chat')
    @Render('index')
    Home() {
        return;
    }

    @Get('/api/chat')
    async Chat(@Res() res) {
        const message =  await this.chatService.getMessages()
        res.json(message)
    }
}
