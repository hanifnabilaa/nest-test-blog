import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { CommentType, CreateCommentInput, UpdateCommentInput } from "./dto/comment.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";
import { PrismaService } from "src/prisma/prisma.service";

@Resolver(() => CommentType)
export class CommentResolver {
    constructor(
        private commentService: CommentService,
        private prisma: PrismaService
    ) { }

    @Mutation(() => CommentType)
    @UseGuards(GqlAuthGuard)
    async addComment(
        @Args('input') input: CreateCommentInput,
        @CurrentUser() user: any,
    ) {
        return this.commentService.create(input, user.userId);
    }

    @Mutation(() => String)
    @UseGuards(GqlAuthGuard)
    async deleteComment(
        @Args('id', { type: () => ID })
        id: string,
        @CurrentUser() user: any,
    ) {
        await this.commentService.delete(id, user.userId);
        return 'Komentar berhasil dihapus';
    }

    @Query(() => [CommentType])
    async getComments(
        @Args('blog_post_id', { type: () => ID })
        blog_post_id: string
    ) {
        return this.commentService.findByPost(blog_post_id);
    }

    @ResolveField('replies', () => [CommentType])
    async getReplies(@Parent() comment: CommentType) {
        return this.prisma.comment.findMany({
            where: { parent_id: comment.id },
            orderBy: { createdAt: 'asc' },
        });
    }

    @Mutation(() => CommentType)
    @UseGuards(GqlAuthGuard)
    async updateComment(
        @Args('input') input: UpdateCommentInput,
        @CurrentUser() user: any,
    ) {
        return this.commentService.update(input.id, input.content, user.userId);
    }
}