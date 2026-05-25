import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { CommentType, CreateCommentInput } from "./dto/comment.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";

@Resolver()
export class CommentResolver {
    constructor(private commentService: CommentService) { }

    @Mutation(() => CommentType)
    @UseGuards(GqlAuthGuard)
    async addComment(
        @Args('input') input: CreateCommentInput,
        @CurrentUser() user: any,
    ) {
        return this.commentService.create(input, user.userId);
    }
}