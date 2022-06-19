import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPostCreate } from './interfaces/IPostCreate';

@Injectable()
export class PostService {

    constructor(private prisma: PrismaService) {}

    findPosts() {
        return this.prisma.post.findMany({});
    }

    findPostsByUserId(userId: number) {
        return this.prisma.post.findMany({
            where: {
                userId
            }
        });
    }

    create(post: IPostCreate) {
        return this.prisma.post.create({ data: {
            caption: post.caption,
            title: post.title,
            userId: post.userId
        } })
    }
}
