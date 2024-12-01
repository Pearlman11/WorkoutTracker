import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/src/libs/mongodb";
import Exercise from "@/src/model/Exercise";

interface RouteParams {
  params: {id: string};
}

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
  context: RouteParams
) {
  const { id } = context.params;

  let updatedExerciseData;
  try {
    updatedExerciseData = await request.json();
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      id,
      updatedExerciseData,
      { new: true } // Return the updated document
    );

    if (!updatedExercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    return NextResponse.json(updatedExercise, { status: 200 });
  } catch (error) {
    console.error('Error updating exercise:', error);
    return NextResponse.json({ error: 'Error updating exercise' }, { status: 500 });
  }
}



