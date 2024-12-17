import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToMongoDB } from "../../../../lib/mongodb";
import User from "models/User";
import clientPromise from "lib/mongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          // Connect to MongoDB
          await connectToMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null; // User not found
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null; // Incorrect password
          }

          return user; // Return user object (required by NextAuth)
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise), // Use MongoDBAdapter for sessions
  session: {
    strategy: "database", // Use database-backed sessions
    maxAge: 30 * 24 * 60 * 60, // Sessions expire after 30 days
  },
  secret: process.env.NEXTAUTH_SECRET, // Must match your secret
  pages: {
    signIn: "/auth/login", // Custom login page
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
