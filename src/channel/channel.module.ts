import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entity/channel.entity';

@Module({
  providers: [ChannelService],
  controllers: [ChannelController],
  imports: [TypeOrmModule.forFeature([Channel])]
})
export class ChannelModule {}
