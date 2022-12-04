import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Server } from './entity/server.entity';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';

@Module({
  controllers: [ServerController],
  providers: [ServerService],
  imports:[
    TypeOrmModule.forFeature([Server]),
    UserModule,
  ],
  exports: [
    ServerService
  ]
})
export class ServerModule {}
