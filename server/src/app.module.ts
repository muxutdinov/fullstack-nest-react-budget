import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CategoryModule,
    UserModule,
    AuthModule,
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        type:'postgres',
        host:configService.get('DB_HOST'),
        port:configService.get("DB_PORT"),
        username:configService.get("DB_USERNAME"),
        password:configService.get("DB_PASSWORD"),
        database:configService.get("DB_NAME"),
        synchronize:true,
        entities:[__dirname+'/**/*.entity{.js,.ts}']
      }),
      inject:[ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
