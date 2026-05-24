import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./dto/auth.type";
import { LoginInput, RegisterInput } from "./dto/auth.input";
import { Query } from "@nestjs/graphql";

@Resolver()
export class AuthResolver {
    constructor(private authservice: AuthService) { }

    @Query(() => String)
    ping() {
        return "GraphQL OK";
    }

    @Mutation(() => AuthResponse)
    async register(@Args('input') input: RegisterInput) {
        return this.authservice.register(input);
    }

    @Mutation(() => AuthResponse)
    async login(@Args('input') input: LoginInput) {
        return this.authservice.login(input);
    }
}