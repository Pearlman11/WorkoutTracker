import mongoose, {Schema, Document} from "mongoose";




interface Set {
  reps: number;
  weight: number;
}

export interface Exercise extends Document {
  exerciseName: string;
  muscleGroup: string;
  sets: Set[];
  date: string;
  dayOfWeek: string;
  email: string;
}

const SetSchema = new Schema<Set>({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true }
});

const ExerciseSchema = new Schema<Exercise>({
  exerciseName: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  sets: [SetSchema],
  date: { type: String, required: true },
  dayOfWeek: { type: String, required: true },
  email: { type: String, required: true }
 }, {
  timestamps: true
});

const Exercise = mongoose.models.Exercise || mongoose.model<Exercise>('Exercise', ExerciseSchema);
export default Exercise; 