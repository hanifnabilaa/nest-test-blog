import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommentType {
    @Field(() => ID)
    id: string;

    @Field()
    comment: string;

    @Field()
    blog_post_id: string;

    @Field({ nullable: true })
    parentId?: string;

    @Field()
    createdAt: Date;
}

@InputType()
export class CreateCommentInput {
    @Field()
    comment: string;

    @Field()
    blog_post_id: string;

    @Field({ nullable: true })
    parentId?: string;
}