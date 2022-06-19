import { Post } from "@prisma/client";
import { Exclude } from "class-transformer";

export class PostReponseDto implements Post {

    constructor(post: Post) {
        Object.assign(this, post);
    }

    id: number;

    @Exclude()
    userId: number;

    title: string;
    
    caption: string;

    createdAt: Date;

    @Exclude()
    updatedAt: Date;

}