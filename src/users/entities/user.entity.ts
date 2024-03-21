import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique:true})
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;

    @Column({default:'user'})
    role: string;

    @OneToMany(() => Order, (order) => order.user) 
    orders: Order[];


}
