import { Module } from '@nestjs/common';
import { ServerMessageService } from './server-message.service';
import { ServerMessageController } from './server-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerMessage } from './entity/server-message.entity';
import { ServerModule } from 'src/server/server.module';
import { ChannelModule } from 'src/channel/channel.module';

@Module({
  providers: [ServerMessageService],
  controllers: [ServerMessageController],
  imports: [
    TypeOrmModule.forFeature([ServerMessage]),
    ServerModule,
    ChannelModule
  ]
})
export class ServerMessageModule {}
