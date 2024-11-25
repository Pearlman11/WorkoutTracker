import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/src/libs/mongodb";
import Exercise from "@/src/model/Exercise";
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    await Exercise.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error deleting exercise' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const exercise = await Exercise.findById( params.id);
    return NextResponse.json(exercise);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching exercise' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { newExercise: updatedExercise } = await request.json();
    await connectMongoDB();
    await Exercise.findByIdAndUpdate(params.id, updatedExercise);
    return NextResponse.json({ message: 'Exercise updated successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error updating exercise' }, { status: 500 });
  }
}