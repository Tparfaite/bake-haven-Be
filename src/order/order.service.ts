import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { error } from 'console';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>, 
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>

  ){}

 async create(createOrderDto: CreateOrderDto):Promise<Order> {
 
  
  const {userId,productId, quantity}=createOrderDto;
  const user= await this.userRepository.findOne({where:{id:userId}});
  if(!user){
    throw error('Please create an account')
  }
  const product= await this.productRepository.findOne({where:{productId}});
  if(!product){
    throw error('This product is not in stock')
  }
   const order:Partial<Order>= {
      user,
      product,
      quantity,
      totalPrice:product.price * quantity,
      createdAt:new Date(),
      status:'pending',

   }
   const saveOrder= this.orderRepository.save(order)
  
    return saveOrder ;
  }

  async findAll():Promise<Order[]> {
    const allOrders= await this.orderRepository.find({relations:["user","product"]});
    return allOrders;
  }

  async findOne(id: number):Promise<any> {
    const oneOrder= await this.orderRepository.findOne({where:{orderId:id}})
    return oneOrder;
  }

 async update(id: number, updateOrderDto: UpdateOrderDto) {
    const presentOrder= await this.orderRepository.findOne({where:{orderId:id}});
    if(!presentOrder){
      throw error("the order not exist")
    }
    await this.orderRepository.update(id,updateOrderDto);

    return this.orderRepository.findOne({where:{orderId:id}});
  }

 async remove(id: number) :Promise<any>{
  const deleteOrder= await this.orderRepository.delete(id)
    return deleteOrder;
  }
}
