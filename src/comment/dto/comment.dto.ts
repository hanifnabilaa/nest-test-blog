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
    parent_id?: string;

    @Field()
    author_id: string;

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

@InputType()
export class UpdateCommentInput {
    @Field(() => ID)
    id: string;

    @Field() // Tanpa { nullable: true }, ini wajib diisi
    content: string;
}