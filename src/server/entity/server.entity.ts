import Category from "src/category/entity/category.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("servers")
export class Server{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name:string

    @Column({nullable: false})
    imagePath:string

    @Column({nullable: false})
    description: string

    @ManyToMany(() => User, (user) => user.servers)
    @JoinTable()
    users: User[]

    @OneToMany(() => Category, (category) => category.server)
    categories: Category[]
}