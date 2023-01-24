import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { User } from './auth/user.entity';
import { ProductController } from './product/product.controller';
import {FavoriteProduct} from "./auth/favorite-product.entity";
import {FavoriteUser} from "./auth/favorite-user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/atiq.sqlite',
      entities: [User, Product /*FavoriteProduct, FavoriteUser*/],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
