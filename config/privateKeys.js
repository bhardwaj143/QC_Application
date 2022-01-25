import dotenv from 'dotenv';
dotenv.config();

let {
    DB_STRING,
    PORT,
    NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD,
    PROJECT_ID,
    PRIVATE_KEY_ID,
    PRIVATE_KEY,
    CLIENT_EMAIL,
    CLIENT_ID
} = process.env;

export const privateKey = {
    'DB_STRING': DB_STRING,
    'PORT': PORT,
    'EMAIL': NODEMAILER_EMAIL,
    'PASSWORD': NODEMAILER_PASSWORD,
    'PROJECT_ID': PROJECT_ID,
    'PRIVATE_KEY_ID': PRIVATE_KEY_ID,
    'PRIVATE_KEY': PRIVATE_KEY,
    'CLIENT_EMAIL': CLIENT_EMAIL,
    'CLIENT_ID': CLIENT_ID
};
