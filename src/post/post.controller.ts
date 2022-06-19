import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IJWTPayload } from 'src/auth/interfaces/IJWTPayload';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { PostCreateBodyDto } from './models/PostCreateBodyDto';
import { PostRequestParamDto } from './models/PostRequestParam';
import { PostReponseDto } from './models/PostRequestParamDto';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('post')
@ApiBearerAuth('access-token')
export class PostController {
    

    constructor(private postService: PostService) {}

    @Get('/list')
    @UseInterceptors(ClassSerializerInterceptor)
    async list() {
        const posts = await this.postService.findPosts();
        return posts.map(post => new PostReponseDto(post));
    }

    @Get('/list/mine')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    async myPostList(
        @User() user: IJWTPayload
    ) {
        const posts = await this.postService.findPostsByUserId(user.id);
        return posts.map(post => new PostReponseDto(post));
    }

    @Get('/list/:userId')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    async listByUser(
        @Param() params: PostRequestParamDto 
    ) {
        const posts = await this.postService.findPostsByUserId(params.userId);
        return posts.map(post => new PostReponseDto(post));
    }

    @Post('/create')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() body: PostCreateBodyDto,
        @User() user: IJWTPayload
        ) {
        return this.postService.create({
            caption: body.caption,
            title: body.title,
            userId: user.id
        })
    }
}
