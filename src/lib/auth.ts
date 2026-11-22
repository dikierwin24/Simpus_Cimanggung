import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 hari
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@pkmcimanggung.go.id" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        const inputEmail = credentials.email.toLowerCase().trim();
        const inputPassword = credentials.password;

        // Coba autentikasi via database Prisma terlebih dahulu
        try {
          const user = await prisma.user.findUnique({
            where: { email: inputEmail },
          });

          if (user) {
            const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
            if (isPasswordValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              };
            }
          }
        } catch (dbError) {
          console.warn("[NextAuth] Database query failed, checking master fallback admin:", dbError);
        }

        // Master Fallback Admin (memastikan admin SELALU bisa masuk di Vercel walau db offline/ephemeral)
        if (
          inputEmail === "admin@pkmcimanggung.go.id" &&
          (inputPassword === "admin123" || inputPassword === "admin")
        ) {
          return {
            id: "master-admin-01",
            name: "Administrator Puskesmas Cimanggung",
            email: "admin@pkmcimanggung.go.id",
            role: "ADMIN",
          };
        }

        throw new Error("Email atau password yang Anda masukkan salah.");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "puskesmas-cimanggung-secret-key-sumedang-2025",
};
