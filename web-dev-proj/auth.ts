import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import {User} from "./src/model/UserSchema";
import connectMongoDB from "./src/libs/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectMongoDB();
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const user = await User.findOne({ email: credentials.email }).exec();

        if (!user) {
          throw new Error("User not found.");
        }
        const isMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials.");
        }

        return { email: user.email, name: user.username };
      },
    }),
  ],
});