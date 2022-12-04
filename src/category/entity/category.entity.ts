import { Server } from "src/server/entity/server.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export default class Category{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToOne(() => Server, (server) => server.users)
    server: Server
}