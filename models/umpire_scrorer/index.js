import mongoose from "mongoose";
import { User } from '../../models/users/index.js';

const { Schema, model } = mongoose;

const umpire_scorerSchema = Schema({
    name: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    mobile: {
		type: Number,
		unique: false
	},
    city: {
        type: String
    },
    state: {
        type: String  
    },
    role: {
        type: String,
        enum: ['umpire', 'scorer'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Umpire_Scorer = model('Umpire_Scorer', umpire_scorerSchema);
