import mongoose, { Schema, Document } from 'mongoose';

interface ISet {
  reps: number;
  weight: number;
}

export interface IExercise extends Document {
  exerciseName: string;
  muscleGroup: string;
  sets: ISet[];
  date: string;
  dayOfWeek: string;
  email: string; // The email of the user who created the exercise
}

const SetSchema = new Schema<ISet>({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true }
});

const ExerciseSchema = new Schema<IExercise>({
  exerciseName: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  sets: [SetSchema],
  date: { type: String, required: true },
  dayOfWeek: { type: String, required: true },
  email: { type: String, required: true }
 }, {
  timestamps: true
});

export default mongoose.models.Exercise || mongoose.model<IExercise>('Exercise', ExerciseSchema);