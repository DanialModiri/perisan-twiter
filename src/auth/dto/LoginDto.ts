import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @ApiProperty()
    userName: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}