import Router from 'express';
import {
    authController, teamsController, userController
} from '../controllers/index.js'

const router = Router();

router.use('/auth', authController);
router.use('/users', userController);
router.use('/teams', teamsController);

export { router };
