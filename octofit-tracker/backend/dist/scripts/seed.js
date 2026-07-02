"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
dotenv_1.default.config();
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await user_1.User.deleteMany({});
    await team_1.Team.deleteMany({});
    await activity_1.Activity.deleteMany({});
    await leaderboard_1.LeaderboardEntry.deleteMany({});
    await workout_1.Workout.deleteMany({});
    const users = await user_1.User.insertMany([
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
    const team = await team_1.Team.create({
        name: 'Ocean Runners',
        sport: 'Running',
        members: users.slice(0, 2).map((user) => user._id),
        captain: users[0]._id,
    });
    await activity_1.Activity.insertMany([
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
    await leaderboard_1.LeaderboardEntry.insertMany([
        { user: users[0]._id, score: 980, rank: 1 },
        { user: users[1]._id, score: 915, rank: 2 },
        { user: users[2]._id, score: 880, rank: 3 },
    ]);
    await workout_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
