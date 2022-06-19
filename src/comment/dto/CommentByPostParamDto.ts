import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CommentByPostParamDto {
    @ApiProperty()
    @IsNotEmpty()
    postId: number;
}