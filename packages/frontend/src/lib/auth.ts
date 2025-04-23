// Removed unused Session import and type extension for clarity and to resolve lint warning.
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { User as DBUser } from "../../../../backend/models/User";
import mongoose from "mongoose";

// Find user by email in MongoDB
async function findUserByEmail(email: string) {
  await mongoose.connect(process.env.MONGODB_URI || "");
  return DBUser.findOne({ email });
}

// Create or update user from GitHub profile
async function upsertGitHubUser(profile: any) {
  await mongoose.connect(process.env.MONGODB_URI || "");
  let user = await DBUser.findOne({ email: profile.email });
  if (!user) {
    user = new DBUser({
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.avatar_url,
      isVerified: true,
      emailVerified: new Date(),
      password: crypto.randomBytes(32).toString("hex"), // random password
    });
    await user.save();
  }
  return user;
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
          emailVerified: user.emailVerified,
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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await findUserByEmail(credentials.email);
        if (!user || !user.password) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    // Optionally add: signOut: "/auth/signout"
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
  },
};