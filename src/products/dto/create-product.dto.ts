import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    productName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(['cake','bread','ibiraha','capati'])
    category: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    imageUrl: string;
}
