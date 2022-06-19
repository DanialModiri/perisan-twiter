import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICommentCreate } from './interfaces/ICommentCreate';

@Injectable()
export class CommentService {

    constructor(private prisma: PrismaService) {}

    createComment(comment: ICommentCreate) {
        return this.prisma.comment.create({
            data: {
                body: comment.body,
                postId: comment.postId,
                userId: comment.userId
            }
        })
    }

    commentsListByPostId(postId: number) {
        return this.prisma.comment.findMany({
            where: {
                postId
            }
        })
    }
}
