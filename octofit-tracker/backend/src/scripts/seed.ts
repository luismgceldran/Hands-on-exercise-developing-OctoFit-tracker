import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

dotenv.config();

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await LeaderboardEntry.deleteMany({});
  await Workout.deleteMany({});

  const users = await User.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya@example.com',
      age: 29,
      fitnessGoal: 'Marathon prep',
      weeklyGoal: 5,
      streak: 7,
    },
    {
      name: 'Jordan Rivera',
      email: 'jordan@example.com',
      age: 34,
      fitnessGoal: 'Strength gain',
      weeklyGoal: 4,
      streak: 11,
    },
    {
      name: 'Alicia Brooks',
      email: 'alicia@example.com',
      age: 27,
      fitnessGoal: 'Weight loss',
      weeklyGoal: 6,
      streak: 3,
    },
  ]);

  const team = await Team.create({
    name: 'Ocean Runners',
    sport: 'Running',
    members: users.slice(0, 2).map((user) => user._id),
    captain: users[0]._id,
  });

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'Run',
      durationMinutes: 45,
      calories: 420,
      note: 'Morning interval run',
    },
    {
      user: users[1]._id,
      type: 'Strength',
      durationMinutes: 60,
      calories: 500,
      note: 'Upper body workout',
    },
    {
      user: users[2]._id,
      type: 'Cycling',
      durationMinutes: 35,
      calories: 280,
      note: 'Steady cardio session',
    },
  ]);

  await LeaderboardEntry.insertMany([
    { user: users[0]._id, score: 980, rank: 1 },
    { user: users[1]._id, score: 915, rank: 2 },
    { user: users[2]._id, score: 880, rank: 3 },
  ]);

  await Workout.insertMany([
    {
      user: users[0]._id,
      title: 'Tempo Run',
      difficulty: 'Intermediate',
      durationMinutes: 40,
      caloriesBurned: 380,
      completed: true,
    },
    {
      user: users[1]._id,
      title: 'Full Body Strength',
      difficulty: 'Advanced',
      durationMinutes: 55,
      caloriesBurned: 540,
      completed: true,
    },
    {
      user: users[2]._id,
      title: 'Recovery Ride',
      difficulty: 'Beginner',
      durationMinutes: 30,
      caloriesBurned: 220,
      completed: false,
    },
  ]);

  console.log(`Seeded ${users.length} users, 1 team, activities, leaderboard entries, and workouts.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
