import { Body, ClassSerializerInterceptor, Controller, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IJWTPayload } from 'src/auth/interfaces/IJWTPayload';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CommentByPostParamDto } from './dto/CommentByPostParamDto';
import { CommentRequestBodyDto } from './dto/CommentRequestBodyDto';
import { CommentResponseDto } from './dto/CommentResponseDto';

@Controller('comment')
@ApiTags('comment')
@ApiBearerAuth('access-token')
export class CommentController {

    constructor(
        private commentService: CommentService,
    ) { }


    @Post('/createComment')
    @UseGuards(JwtAuthGuard)
    async createComment(
        @Body() body: CommentRequestBodyDto,
        @User() user: IJWTPayload
    ) {

        const comment = await this.commentService.createComment({
            body: body.body,
            postId: body.postId,
            userId: user.id
        })

        return new CommentResponseDto(comment);
    }

    @Post('/listByPostId/:postId')
    @UseInterceptors(ClassSerializerInterceptor)
    async listByPostId(
        @Param() commentByPostParamDto: CommentByPostParamDto
    ) {
        const comments = await this.commentService.commentsListByPostId(commentByPostParamDto.postId);
        return comments.map(comment => new CommentResponseDto(comment));
    }
}
