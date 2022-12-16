import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entity/channel.entity';
import { ServerModule } from 'src/server/server.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  providers: [ChannelService],
  controllers: [ChannelController],
  imports: [
    TypeOrmModule.forFeature([Channel]),
    CategoryModule
  ],
  exports: [
    ChannelService
  ]
})
export class ChannelModule {}
