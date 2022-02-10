import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { validators } from '../../middleware/index.js';
import {
    addUmpireScorer,
    updateUmpireScorerDetail,
   findUmpireScorerById,
    findAllUmpireScorer,
    deleteUmpireScorer
} from '../../services/index.js';


//Response Status code
const { SUCCESS, NOT_FOUND } = statusCodes;

//Response Messages
const { FETCH_UMPIRE_SCORER, FETCH_ALL_UMOIRE_SCORER, DELETE_UMPIRE_SCORER, ADD_UMPIRE_SCORER, UMPIRE_SCORER_NOT_FOUND, UPDATE_UMPIRE_SCORER } = responseMessages;


const router = Router();

//Add umpire scorer
router.post('/', catchAsyncAction(async (req, res) => {
    let addUmpire_scorer = await addUmpireScorer(req.body);
    return makeResponse(res, SUCCESS, true, ADD_UMPIRE_SCORER, addUmpire_scorer);
}));

//Update Upire scorer Details
router.patch('/', catchAsyncAction(async (req, res) => {
    let updateUmpireScorer = await updateUmpireScorerDetail(req.body, { _id: req.query.id });
    return makeResponse(res, SUCCESS, true, UPDATE_UMPIRE_SCORER, updateUmpireScorer);
}));

//Get umpire scorer By Id
router.get('/:id', catchAsyncAction(async (req, res) => {
    let umpire_scorer = await findUmpireScorerById({ _id: req.params.id })
    if (umpire_scorer) return makeResponse(res, SUCCESS, true, FETCH_UMPIRE_SCORER, umpire_scorer);
    if (!umpire_scorer) return makeResponse(res, NOT_FOUND, false, UMPIRE_SCORER_NOT_FOUND);
}));


//Get All umpire scorer
router.get('/', catchAsyncAction(async (req, res) => {
    let regx;
    regx = new RegExp(req.query.search);
    let umpire_scorer = await findAllUmpireScorer({ isDeleted: false, $or: [{ 'name': { '$regex': regx, $options: 'i' } }] })
    if (umpire_scorer) return makeResponse(res, SUCCESS, true, FETCH_ALL_UMOIRE_SCORER, umpire_scorer);
    if (!umpire_scorer) return makeResponse(res, NOT_FOUND, false, UMPIRE_SCORER_NOT_FOUND);
}));

//Delete umpire scorer
router.delete('/:id', catchAsyncAction(async (req, res) => {
    let umpire_scorer = await deleteUmpireScorer({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_UMPIRE_SCORER);
}));

export const umpireScorerController = router;
