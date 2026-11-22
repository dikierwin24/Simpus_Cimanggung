import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Only replicate SQLite if DATABASE_URL starts with "file:" or is not set.
// If connecting to PostgreSQL (Supabase / Neon), we DO NOT touch process.env.DATABASE_URL!
if (
  (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) &&
  (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith("file:"))
) {
  try {
    const tmpDbPath = path.join("/tmp", "dev.db");
    if (!fs.existsSync(tmpDbPath)) {
      const candidatePaths = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
        path.resolve("./prisma/dev.db"),
      ];
      for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
          fs.copyFileSync(p, tmpDbPath);
          break;
        }
      }
    }
    if (fs.existsSync(tmpDbPath)) {
      process.env.DATABASE_URL = `file:${tmpDbPath}`;
    }
  } catch (err) {
    console.warn("[Prisma Init] Could not setup /tmp SQLite:", err);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
