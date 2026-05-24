import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
    @Field()
    id: string;
    @Field()
    username: string;
}

@ObjectType()
export class AuthResponse {
    @Field()
    accessToken: string;
    @Field(() => UserType)
    user: UserType;
}