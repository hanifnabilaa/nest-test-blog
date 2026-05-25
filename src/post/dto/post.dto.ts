import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BlogPostType {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    author_id: string;

    @Field()
    createdAt: Date;
}

@InputType()
export class CreatePostInput {
    @Field()
    title: string;

    @Field()
    content: string;
}

