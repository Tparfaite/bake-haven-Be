import { Body, Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
 

constructor(@InjectRepository(User) private readonly userRepository:Repository<User> ){}

 async create(createUserDto: CreateUserDto): Promise<User | string> {

  const admin={
    firstName:'admin',
    lastName:'bakehaven',
    email: 'admin@gmail.com',
    phoneNumber: '0987777777',
    password:'admin123',
    role:'admin'
  }
const saltAd=10;
const adminPasswordHash=await bcrypt.hash(admin.password,saltAd);
admin.password=adminPasswordHash;

const existAdmin=await this.userRepository.findOne({where:{email:admin.email}});
if(!existAdmin){
 const adminToAdd= await this.userRepository.save(admin);
 console.log(adminToAdd)

}


  const existingUser= await this.userRepository.findOne({where:{email:createUserDto.email}})
  if(existingUser){
    return "user with this email already exist"
  }
  const salt= 10;
  const hashedPassword= await bcrypt.hash(createUserDto.password, salt);
  createUserDto.password=hashedPassword;
  const user= await this.userRepository.save(createUserDto);
    return user;
  }

  async findAll() : Promise<User[]>{
    const users= await this.userRepository.find()
    return users ;
  }

  async findOne(id: number):Promise<User> {
    const user= await this.userRepository.findOne({where:{id}})
    return user;
  }

 async update(id:number,updateUserDto: UpdateUserDto ): Promise<any> {
  let userUpdate= await this.userRepository.findOne({where:{id}});
  if(!userUpdate){
    throw error("user not found!")
  }
  await this.userRepository.update(id,updateUserDto);
  return await this.userRepository.findOne({where:{id}});

 }

  async remove(id: number):Promise<any>{
    const removedUser = await this.userRepository.delete(id);

    return removedUser;
  }

  async getUserByEmail(email:string ):Promise<User>{
    const user= await this.userRepository.findOne({where:{email}})
    return user;
  }
  

}
