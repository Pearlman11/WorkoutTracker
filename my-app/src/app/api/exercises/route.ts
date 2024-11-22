import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/db';
import Exercise from '@/models/Exercise';
export async function GET() {
  try {
    await connectMongoDB();
    const exercises = await Exercise.find({});
    return NextResponse.json(exercises);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const exercise = await Exercise.create(data);
    return NextResponse.json(exercise);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create exercise' }, { status: 500 });

  }
}