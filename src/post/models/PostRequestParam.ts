import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PostRequestParamDto {

    @ApiProperty()
    @IsNotEmpty()
    userId: number;

}