import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
// import bcrypt from "bcrypt";
// import { User as DBUser } from "../../../../backend/models/User";
import mongoose from "mongoose";


// Create or update user from GitHub profile
async function upsertGitHubUser(profile: any) {
  await mongoose.connect(process.env.MONGODB_URI || "");
  // Replace with API call or shared package import
  return {
    _id: "mock-id",
    name: profile.name || profile.login,
    email: profile.email,
    image: profile.avatar_url,
    isVerified: true,
    emailVerified: new Date(),
    password: "",
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      async profile(profile) {
        const user = await upsertGitHubUser(profile);
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        try {
          const res = await fetch("http://localhost:5000/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
          if (!res.ok) {
            return null;
          }
          const data = await res.json();
          // NextAuth expects a user object (id, name, email, image, etc)
          if (data && data.user) {
            return {
              id: data.user.id || data.user._id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.image || null
            };
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    // Optionally add: signOut: "/auth/signout"
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
};