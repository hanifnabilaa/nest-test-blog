import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BlogPostType, CreatePostInput } from "./dto/post.dto";
import { PostService } from "./post.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";

@Resolver(() => BlogPostType)
export class PostResolver {
    constructor(private postService: PostService) { }

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
}