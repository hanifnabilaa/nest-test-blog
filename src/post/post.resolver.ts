import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { BlogPostType, CreatePostInput, UpdatePostInput } from "./dto/post.dto";
import { PostService } from "./post.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";
import { CommentService } from "src/comment/comment.service";
import { CommentType } from "src/comment/dto/comment.dto";

@Resolver(() => BlogPostType)
export class PostResolver {
    constructor(
        private postService: PostService,
        private commentservice: CommentService,
    ) { }

    @Query(() => [BlogPostType])
    async getPosts(
        @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
        @Args('cursor', { type: () => String, nullable: true }) cursor?: string,
    ) {
        return this.postService.findAll(limit, cursor);
    }

    @Mutation(() => BlogPostType)
    @UseGuards(GqlAuthGuard)
    async createPost(
        @Args('input') input: CreatePostInput,
        @CurrentUser() user: any
    ) {
        return this.postService.create(input, user.userId);
    }

    @Mutation(() => BlogPostType)
    @UseGuards(GqlAuthGuard)
    async updatePost(
        @Args('input') input: UpdatePostInput,
        @CurrentUser() user: any,
    ) {
        return this.postService.update(input, user.userId)
    }

    @Mutation(() => ID)
    @UseGuards(GqlAuthGuard)
    async deletePost(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: any,
    ) {
        const deletePost = await this.postService.delete(id, user.userId);
        return deletePost.id;
    }

    @ResolveField('comments', () => [CommentType])
    async getComments(@Parent() post: BlogPostType) {
        return this.commentservice.findByPost(post.id)
    }
}
