import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import { addUser, findUserDetail } from '../../services/index.js';

//Response Status code
const { SUCCESS, NOT_FOUND, RECORD_ALREADY_EXISTS } = statusCodes;

//Response Messages
const { ALREADY_EXIST, REGISTERD, INVALID_EMAIL, INCORRECT_PASSWORD, LOGIN } = responseMessages;

const router = Router();

/*
NOTE: for internal use only:--
*/
//Add Trainer
router.post('/sign-up', validators('ADD_USER'), catchAsyncAction(async (req, res) => {
    let userRecord = await findUserDetail({ email: req.body.email });
    if (userRecord) return makeResponse(res, RECORD_ALREADY_EXISTS, false, ALREADY_EXIST);
    let newUser = await addUser(req.body, req.query.role);
    // Mapping for removing password
    let newUserMapper = await userMapper(newUser);
    return makeResponse(res, SUCCESS, true, REGISTERD, newUserMapper);
}));

//Login user
router.post('/login', validators('LOGIN'), catchAsyncAction(async (req, res) => {
    const userRecord = await findUserDetail({ email: req.body.email });
    if (!userRecord || userRecord?.isDeleted) return makeResponse(res, NOT_FOUND, false, INVALID_EMAIL);
    let checkPassword = await userRecord.comparePassword(req.body.password, userRecord.password);
    if (!checkPassword) throw new Error(INCORRECT_PASSWORD);
    let userDetail = await userMapper(userRecord);
    //Genrate auth token
    const accessToken = userRecord.generateAuthToken(userRecord._id, req.query.role);
    const refreshToken = userRecord.generateRefershToken(userRecord._id, req.query.role);
    return makeResponse(res, SUCCESS, true, LOGIN, userDetail, { accessToken, refreshToken });
}));

//User profile
router.get('/me', auth, catchAsyncAction(async (req, res) => {
    const userRecord = await findUserDetail({ _id: req.userData._id });
    if (!userRecord || userRecord?.isDeleted) return makeResponse(res, NOT_FOUND, false, INVALID_EMAIL);
    let userDetail = await userMapper(userRecord);
    return makeResponse(res, SUCCESS, true, LOGIN, userDetail);
}));

export const authController = router;
