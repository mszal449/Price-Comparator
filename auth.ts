import { connectToMongoDB } from "lib/mongodb";
import User from "models/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { encode, decode } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email " },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        await connectToMongoDB();
        const user = await User.findOne({ email });

        if (!user) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          String(password),
          String(user.password),
        );
        if (isValidPassword) {
          return { id: user._id, email: user.email, role: user.role };
        }

        return null;
      },
    }),
  ],
  jwt: { encode, decode },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
