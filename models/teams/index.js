import mongoose from "mongoose";
import { User } from '../../models/users/index.js';
const { Schema, model } = mongoose;

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        enum: ['batsman', 'bowler', 'wicket_keeper', 'all_rounder'],
    },
}, { _id: false }, { typeKey: '$type' });

const TeamsSchema = Schema({
    team_logo: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    teamcity: {
        type: String
    },
    participants: {
        type: [participantSchema],
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


export const Teams = model('Teams', TeamsSchema);
