import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateOrderDto {


    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    productId: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    quantity: number;

   

}
