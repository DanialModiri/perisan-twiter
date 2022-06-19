import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CommentRequestBodyDto {
    
    @ApiProperty()
    @IsNotEmpty()
    postId: number;

    @ApiProperty()
    @IsNotEmpty()
    body: string;
}