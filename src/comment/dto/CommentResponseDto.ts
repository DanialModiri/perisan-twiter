import { ApiProperty } from "@nestjs/swagger";
import { Post, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class CommentResponseDto implements Post {
    
    constructor(post: Partial<Post>) {
        Object.assign(this, post);
    }

    @Exclude()
    id: number;

    @Exclude()
    userId: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    caption: string;

    @ApiProperty()
    body: string;
    
    @ApiProperty()
    user: User;

    createdAt: Date;
    updatedAt: Date;
}