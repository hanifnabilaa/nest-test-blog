import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentInput } from "./dto/comment.dto";

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) { }

    async create(input: CreateCommentInput, author_id: string) {
        return this.prisma.comment.create({
            data: {
                comment: input.comment,
                blog_post_id: input.blog_post_id,
                author_id: author_id,
                parent_id: input.parentId,
            }
        });
    }
}