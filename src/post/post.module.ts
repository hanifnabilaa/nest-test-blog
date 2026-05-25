import { Module } from "@nestjs/common";
import { PostResolver } from "./post.resolver";
import { PostService } from "./post.service";
import { CommentModule } from "src/comment/comment.module";

@Module({
    imports: [CommentModule],
    providers: [PostService, PostResolver],
})
export class PostModule { }