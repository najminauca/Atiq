import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FavoriteSeller} from "../favorite/favorite-seller.entity";
import {FavoriteProduct} from "../favorite/favorite-product.entity";
import {AuthModule} from "../auth/auth.module";
import {ChatRoom} from "./chat-room.entity";
import {Chat} from "./chat.entity";
import {ChatGateway} from "./chat.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatRoom])],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
