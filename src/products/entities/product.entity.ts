import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
@PrimaryGeneratedColumn()
productId: number

@Column()
productName: string

@Column({type:'enum',enum:['cake','bread', 'ibiraha', 'capati']})
category: string

@Column()
quantity: number

@Column()
price: number

@Column()
description: string

@Column()
imageUrl: string




}
