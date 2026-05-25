import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostInput } from "./dto/post.dto";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async create(input: CreatePostInput, author_id: string) {
        return this.prisma.blogPost.create({
            data: {
                title: input.title,
                content: input.content,
                author_id: author_id
            }
        })
    }

    async findAll(take: number, cursor?: string) {
        return this.prisma.blogPost.findMany({
            take: take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: {
                createdAt: 'desc'
            },
        })
    }
}