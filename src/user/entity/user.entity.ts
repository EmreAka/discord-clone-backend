import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    FirstName: string;
    @Column()
    LastName: string;
    @Column()
    Email: string;
    @Column({ type: "bytea" })
    PasswordSalt: Buffer;
    @Column({ type: "bytea" })
    PasswordHash: Buffer;
    @Column()
    Status: boolean;
}