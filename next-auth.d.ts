import { DefaultSession, DefaultUser } from "next-auth";

// 1. Extend Session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "user";
    } & DefaultSession["user"];
  }

  // 2. Extend User
  interface User extends DefaultUser {
    role: "admin" | "user";
  }
}

// 3. Extend JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "user";
  }
}
