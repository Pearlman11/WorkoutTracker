import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/UserSchema";
import connectMongoDB from "./libs/db";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials:{
                username: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({username: credentials.username}).lean();
                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            return {
                                id: user.id.toString(),
                                username: user.username,
                            };
                        } else {
                            console.log("Username or Password is not correct");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error: any) {
                    console.log("An error occurred", error);
                    return null;
                }
            },
        }),
    ],
});