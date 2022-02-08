import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';;
import {
    addUser,
    findUserByMobile,
    updateUser,
    findUserById,
    findAllUsers,
    deleteUser,
    findAllUmpireScorer
} from '../../services/index.js';

//Response Status code
const { SUCCESS, NOT_FOUND } = statusCodes;

//Response Messages
const { ALREADY_EXIST, FETCH_USER, FETCH_USERS, DELETE_USER, FETCH_ALL_UMOIRE_SCORER, UMPIRE_SCORER_NOT_FOUND, LOGIN, USER_NOTFOUND, UPDATE_USER } = responseMessages;


const router = Router();

//Login_Signup
router.post('/login', validators('LOGIN'), catchAsyncAction(async (req, res) => {
    const { mobile } = req.body;
    const user = await findUserByMobile({ mobile });
    if (user) {
        const accessToken = user.generateAuthToken(user._id);
        const refreshToken = user.generateRefershToken(user._id);
        return makeResponse(res, SUCCESS, true, ALREADY_EXIST, user, { accessToken, refreshToken });
    }
    if (!user) {
        let add_User = await addUser(req.body);
        const accessToken = add_User.generateAuthToken(add_User._id);
        const refreshToken = add_User.generateRefershToken(add_User._id);
        return makeResponse(res, SUCCESS, true, LOGIN, add_User, { accessToken, refreshToken });
    }
}));

//Update User profile
router.patch('/', upload.fields([{ name: 'profile_pic', maxCount: 1 }]), auth, catchAsyncAction(async (req, res) => {
    if (req?.files?.profile_pic?.length > 0) req.body.profile_pic = req.files.profile_pic[0].path;
    let updateUserProfile = await updateUser(req.body, { _id: req.userData.id });
    //Delete fields temporary from response
    let userRecord = await userMapper(updateUserProfile);
    return makeResponse(res, SUCCESS, true, UPDATE_USER, userRecord);
}));

//Get User Profile
router.get('/me', auth, catchAsyncAction(async (req, res) => {
    const user = await findUserById({ _id: req.userData.id })
    if (user) return makeResponse(res, SUCCESS, true, FETCH_USER, user);
    if (!user) return makeResponse(res, NOT_FOUND, false, USER_NOTFOUND);
}));


//Get All Users
router.get('/', auth, catchAsyncAction(async (req, res) => {
    const user = await findAllUsers()
    if (user) return makeResponse(res, SUCCESS, true, FETCH_USERS, user);
    if (!user) return makeResponse(res, NOT_FOUND, false, USER_NOTFOUND);
}));

//Delete User
router.delete('/:id', auth, catchAsyncAction(async (req, res) => {
    let user = await deleteUser({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_USER);
}));

//Find Umpire scorer by role
router.get('/by_role', catchAsyncAction(async (req, res) => {
    let umpire_scorer = await findAllUmpireScorer({role: req.body.role})
    if (umpire_scorer) return makeResponse(res, SUCCESS, true, FETCH_ALL_UMOIRE_SCORER, umpire_scorer);
    if (!umpire_scorer) return makeResponse(res, NOT_FOUND, false, UMPIRE_SCORER_NOT_FOUND);
}));

export const userController = router;

