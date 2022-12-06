import Category from "src/category/entity/category.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => User)
    founder:User

    @ManyToMany(() => User, (user) => user.servers)
    @JoinTable({name: 'enrolled_users'})
    users: User[]

    @OneToMany(() => Category, (category) => category.server)
    categories: Category[]
}