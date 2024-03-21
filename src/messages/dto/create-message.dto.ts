import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    names: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    message: string
}
