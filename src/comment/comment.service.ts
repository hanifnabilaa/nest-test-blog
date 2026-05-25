import { Injectable, UnauthorizedException } from "@nestjs/common";
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

    async update(id: string, comment: string, author_id: string) {
        try {
            return await this.prisma.comment.update({
                where: {
                    id: id,
                    author_id: author_id,
                },
                data: {
                    comment: comment,
                },
            });
        } catch (error) {
            throw new UnauthorizedException('Gagal update: Komentar tidak ditemukan atau Anda tidak memiliki akses');
        }
    }

    async findByPost(blog_post_id: string) {
        return this.prisma.comment.findMany({
            where: { blog_post_id: blog_post_id },
            orderBy: { createdAt: 'asc' }
        })
    }

    async findReplies(parent_id: string) {
        return this.prisma.comment.findMany({
            where: { parent_id: parent_id },
            orderBy: { createdAt: 'asc' }
        })
    }

    async delete(id: string, author_id: string) {
        try {
            return await this.prisma.comment.delete({
                where: {
                    id: id,
                    author_id: author_id,
                },
            });
        } catch (error) {
            throw new UnauthorizedException('Gagal hapus: Komentar tidak ditemukan atau Anda tidak memiliki akses');
        }
    }
}