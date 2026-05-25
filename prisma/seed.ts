import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Sedang membuat 1000 data...')

    const author_id = 'e556f6af-fe06-40a6-a57e-fcc78a9c74ff';
    const posts = Array.from({ length: 1000 }, (_, i) => ({
        title: `Postingan Testing Ke-${i + 1}`,
        content: `Ini adalah konten untuk postingan nomor ${i + 1}.`,
        author_id: author_id,
    }));

    await prisma.blogPost.createMany({
        data: posts,
    });

    console.log('1000 data berhasil dibuat');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });