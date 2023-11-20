import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ['loghindan494@gmail.com', ''];

export const authOptions = {
  secret: process.env.GOOGLE_SECRET,
  providers: [
    GoogleProvider({
      clientId: "687999287053-stsmvdk76v891hvp717a36j8d3sd1m64.apps.googleusercontent.com",
      clientSecret: "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"
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}