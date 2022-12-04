import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entity/server.entity';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';

@Module({
  controllers: [ServerController],
  providers: [ServerService],
  imports:[TypeOrmModule.forFeature([Server])]
})
export class ServerModule {}
