import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
  
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number):Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiBody({
    schema:{
      type:'object',
      properties:{
        email:{type:'string',description:'user email' },
        password:{type:'string',description:'user password' }
      }
    }
  })
  @Post('login')
  async login(
    @Body('email') email:string,
    @Body('password') password:string
  ){
  const user= await this.usersService.getUserByEmail(email);
  if(!user){
    throw new BadRequestException("Invalid credentials")
  }
  console.log("user", user.password)

  if(!await bcrypt.compare(password, user.password)){
    throw new BadRequestException("Invalid credentials")
  }
  return user;

  }

}
