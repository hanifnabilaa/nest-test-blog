import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostInput, UpdatePostInput } from "./dto/post.dto";

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

    async update(input: UpdatePostInput, author_id: string) {
        try {
            return await this.prisma.blogPost.update({
                where: {
                    id: input.id,
                    author_id: author_id
                },
                data: {
                    ...(input.title && { title: input.title }),
                    ...(input.content && { content: input.content })
                },
            });
        } catch (error) {
            throw new UnauthorizedException('Gagal update: Postingan tidak ditemukan atau Anda bukan pemiliknya');
        }
    }

    async delete(id: string, author_id: string) {
        try {
            return await this.prisma.blogPost.delete({
                where: {
                    id: id,
                    author_id: author_id,
                },
            });
        } catch (error) {
            throw new UnauthorizedException('Gagal menghapus: Postingan tidak ditemukan atau Anda tidak memiliki');
        }
    }
}