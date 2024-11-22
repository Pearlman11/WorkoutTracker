import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/db';
import User from '@/models/UserSchema';
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs'


export async function POST(request: NextRequest) {
    const {username, password} = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
        username,
        password: hashedPassword,
    }
    try {
        await User.create(newUser);
        return NextResponse.json({message: "User added successfully"}, {status: 201})
    } catch(err: any) {
        return NextResponse.json({message: "Failed to create user."}, {status: 405})
    }
}
