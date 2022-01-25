import Router from 'express';
import {
    authController
} from '../controllers/index.js'

const router = Router();

router.use('/auth', authController);

export { router };
