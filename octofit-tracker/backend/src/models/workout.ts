import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: Number,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
