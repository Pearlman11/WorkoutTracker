import connectMongoDB from "@/src/libs/mongodb";
import {User} from "@/src/model/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const {username, email, password} = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
        username,
        email,
        password: hashedPassword
    }
    try {
        await User.create(newUser);
    } catch (err:any) {
        console.log(err.message);
    }
    return NextResponse.json({message: "User added successfully"}, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({users});
}