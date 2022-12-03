import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOCAL_DATABASE_HOST,
      port: +process.env.LOCAL_DATABASE_PORT,
      username: process.env.LOCAL_DATABASE_USERNAME,
      password: process.env.LOCAL_DATABASE_PASSWORD,
      database: process.env.LOCAL_DATABASE_DATABASE,
      entities: [User],
      synchronize: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // }
    }),
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
