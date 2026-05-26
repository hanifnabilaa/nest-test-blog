import { Injectable } from "@nestjs/common";
// import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from 'dotenv'; // 1. Import dotenv

dotenv.config(); // 2. Paksa baca file .env saat file ini diload

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({
            // Sekarang process.env.DATABASE_URL dijamin ada isinya
            connectionString: process.env.DATABASE_URL as string,
        });
        super({ adapter });

        // Ganti console.log ini untuk memastikan
        // console.log("DATABASE_URL:", process.env.DATABASE_URL);
    }
}