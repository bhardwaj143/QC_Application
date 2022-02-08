import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';;
import {
    addTeam,
    updateTeamDetails,
    findTeamById,
    findAllTeams,
    deleteTeams
} from '../../services/index.js';

//Response Status code
const { SUCCESS, NOT_FOUND } = statusCodes;

//Response Messages
const { PLAYER_ADDED , FETCH_TEAM, FETCH_TEAMS, DELETE_TEAM, ADD_TEAM, TEAM_NOT_FOUND, UPDATE_TEAM_DETAILS } = responseMessages;


const router = Router();

//Add Team
router.post('/', upload.fields([{ name: 'team_logo', maxCount: 1 }]), validators('ADD_TEAM'), auth, catchAsyncAction(async (req, res) => {
    if (req?.files?.team_logo?.length > 0) req.body.team_logo = req.files.team_logo[0].path;
        let add_team = await addTeam(req.body);
        return makeResponse(res, SUCCESS, true, ADD_TEAM, add_team);
}));

//Update Teams Details
router.patch('/', upload.fields([{ name: 'team_logo', maxCount: 1 }]), auth, catchAsyncAction(async (req, res) => {
    if (req?.files?.team_logo?.length > 0) req.body.team_logo = req.files.team_logo[0].path;
    let updateTeamDetail = await updateTeamDetails(req.body, { _id: req.query.id });
    return makeResponse(res, SUCCESS, true, UPDATE_TEAM_DETAILS, updateTeamDetail);
}));

//Get Team By Id
router.get('/:id', auth, catchAsyncAction(async (req, res) => {
    let team = await findTeamById({ _id: req.params.id })
    if (team) return makeResponse(res, SUCCESS, true, FETCH_TEAM, team);
    if (!team) return makeResponse(res, NOT_FOUND, false, TEAM_NOT_FOUND);
}));


//Get All Teams
router.get('/', auth, catchAsyncAction(async (req, res) => {
    let team = await findAllTeams()
    if (team) return makeResponse(res, SUCCESS, true, FETCH_TEAMS, team);
    if (!team) return makeResponse(res, NOT_FOUND, false, TEAM_NOT_FOUND);
}));

//Delete User
router.delete('/:id', auth, catchAsyncAction(async (req, res) => {
    let teams = await deleteTeams({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_TEAM);
}));

//ADD-Player
router.patch('/add_player', auth, catchAsyncAction(async (req, res) => {
    let addedPlayer = await updateTeamDetails(req.body, { _id: req.query.id });
    return makeResponse(res, SUCCESS, true, PLAYER_ADDED, addedPlayer);
}));

export const teamsController = router;

