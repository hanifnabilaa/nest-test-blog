import { Module } from "@nestjs/common";
import { PostResolver } from "./post.resolver";
import { PostService } from "./post.service";
import { CommentModule } from "src/comment/comment.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [CommentModule, AuthModule],
    providers: [PostService, PostResolver],
})
export class PostModule { }