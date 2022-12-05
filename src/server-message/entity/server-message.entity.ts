import { Channel } from "src/channel/entity/channel.entity";
import { Server } from "src/server/entity/server.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('server_messages')
export class ServerMessage{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    //TODO: Consider if this is necessary or not.
    @ManyToOne(() => Server)
    server: Server

    @ManyToOne(() => Channel)
    channel: Channel
}