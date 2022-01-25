import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import { hash, compare } from 'bcrypt';

const { Schema, model } = mongoose;

const userSchema = Schema({
    otp: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['Trainer', 'User', 'Admin'],
        default: 'User'
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {  
    let user = this;
    if (!user.isModified("password")) {
      return next();
    }  
    const hashPassword = await hash(user.password, 12);
    user.password = hashPassword; 
    return next();
});

userSchema.methods.generateAuthToken = function (_id, role) {
    return jwt.sign({ id: _id, role }, config.get("privateKey"), { expiresIn: '15d' });
};

userSchema.methods.generateRefershToken = function (_id, role) {
    return jwt.sign({ id: _id, role }, config.get("privateKey"), { expiresIn: '30d' });
};

userSchema.methods.comparePassword = function (raw, encrypted) {
    return new Promise((resolve, reject) => {
      compare(raw, encrypted)
      .then(resolve)
      .catch(reject);
    });
};

export const User = model('User', userSchema);
