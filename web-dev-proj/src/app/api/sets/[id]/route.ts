import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/src/libs/mongodb';
import Exercise from '@/src/model/Exercise';

interface RouteParams {
  params: { id: string };
}

// GET method to fetch sets of an exercise
export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  const { id } = context.params;

  await connectMongoDB();

  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    return NextResponse.json(exercise.sets, { status: 200 });
  } catch (error) {
    console.error('Error fetching sets:', error);
    return NextResponse.json({ error: 'Error fetching sets' }, { status: 500 });
  }
}

// PUT method to update sets of an exercise
export async function PUT(
  request: NextRequest,
  context: RouteParams
) {
  const { id } = context.params;

  let updatedSets;
  try {
    const { sets } = await request.json();
    updatedSets = sets;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      id,
      { sets: updatedSets },
      { new: true } // Return the updated document
    );

    if (!updatedExercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    return NextResponse.json(updatedExercise, { status: 200 });
  } catch (error) {
    console.error('Error updating sets:', error);
    return NextResponse.json({ error: 'Error updating sets' }, { status: 500 });
  }
}

// DELETE method to delete a specific set from an exercise
export async function DELETE(
  request: NextRequest,
  context: RouteParams
) {
  const { id } = context.params;

  let setId;
  try {
    const { setId: sId } = await request.json();
    setId = sId;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    exercise.sets = exercise.sets.filter((set: any) => set._id.toString() !== setId);
    await exercise.save();

    return NextResponse.json(exercise, { status: 200 });
  } catch (error) {
    console.error('Error deleting set:', error);
    return NextResponse.json({ error: 'Error deleting set' }, { status: 500 });
  }
}