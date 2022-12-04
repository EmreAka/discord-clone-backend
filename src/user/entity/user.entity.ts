import { Server } from "src/server/entity/server.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({unique: true})
    email: string;
    @Column({unique: true})
    username:string;
    @Column({ type: "bytea" })
    passwordSalt: Buffer;
    @Column({ type: "bytea" })
    passwordHash: Buffer;
    @Column()
    status: boolean;

    @ManyToMany(() => Server, (server) => server.users)
    servers: Server[]
}