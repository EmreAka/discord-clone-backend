import { Channel } from "src/channel/entity/channel.entity";
import { Server } from "src/server/entity/server.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('server_messages')
export class ServerMessage{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @CreateDateColumn()
    createdAt: Date

    //TODO: Consider if this is necessary or not.
    @ManyToOne(() => Server)
    server: Server

    @ManyToOne(() => Channel)
    channel: Channel

    @ManyToOne(() => User)
    user: User
}