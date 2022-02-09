import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

const { Schema, model } = mongoose;

const userSchema = Schema({
    profile_pic: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    countoryCode: {
        type: String,
        required: false
    },
    mobile: {
		type: Number,
		unique: false
	},
    lastName: {
        type: String,
        required: false
    },
    city: {
        type: String
    },
    state: {
        type: String  
    },
    role: {
        type: String,
        enum: ['batsman', 'bowler', 'wicket_keeper', 'all_rounder'],
    },
    roleType: {
        type: String,
        enum: ['R_Hand', 'L_Hand'],
    },
    isFirstTime: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = function (_id, role) {
    return jwt.sign({ id: _id, role }, config.get("privateKey"), { expiresIn: '60d' });
};

userSchema.methods.generateRefershToken = function (_id, role) {
    return jwt.sign({ id: _id, role }, config.get("privateKey"), { expiresIn: '90d' });
};

export const User = model('User', userSchema);
