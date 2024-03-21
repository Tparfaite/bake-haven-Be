import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column()
    totalPrice: number;

    @Column()
    quantity: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date; 
  
    @Column({ default: 'pending', type:'enum', enum:['pending','approved','rejected'] })
    status: string; 
  
    @Column({ default: false })
    isPaid: boolean; 
  
    @ManyToOne(() => User, (user) => user.orders)
    user: User; 
  
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;
}
