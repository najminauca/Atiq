import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { User } from './auth/user.entity';
import { ProductController } from './product/product.controller';
import {FavoriteProduct} from "./favorite/favorite-product.entity";
import {FavoriteSeller} from "./favorite/favorite-seller.entity";
import {FavoriteModule} from "./favorite/favorite.module";
import { ChatModule } from './chat/chat.module';
import {ChatRoom} from "./chat/chat-room.entity";
import {Chat} from "./chat/chat.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/atiq.sqlite',
      entities: [
        User,
        Product,
        FavoriteProduct,
        FavoriteSeller,
        Chat,
        ChatRoom,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
    FavoriteModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
