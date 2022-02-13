import { Umpire_Scorer } from '../../models/index.js';


//Find Team detail
export const findUmpireScorerDetail = async (condition = {}) => await Umpire_Scorer.findOne(condition).exec();

//Add Team
export const addUmpireScorer = async (payload = {}) => {
	let umpireScorer = new Umpire_Scorer(payload);
	return umpireScorer.save();
};

// //Find Team by Id
export const findUmpireScorerById = (search = {}) => new Promise((resolve, reject) => {
	Umpire_Scorer.findOne(search).select('-password')
		.populate('userId')
		.then(resolve)
		.catch(reject)
});

//Update Team
export const updateUmpireScorerDetail = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
	Umpire_Scorer.findOneAndUpdate(condition, { $set: userprops }, { new: true })
		.then(resolve)
		.catch(reject);
});

//Find all Teams
export const findAllUmpireScorer = (search = {}, skip, limit) => new Promise((resolve, reject) => {
	Umpire_Scorer.find(search)
		.populate('userId')
		.skip(skip).limit(limit)
		.sort('-createdAt')
		.then(resolve)
		.catch(reject)
});


//Get count
export const getumpireScorerCount = (search) => new Promise((resolve, reject) => {
	Umpire_Scorer.count(search)
		.then(resolve)
		.catch(reject)
});

//Delete Team
export const deleteUmpireScorer = (id) => new Promise((resolve, reject) => {
	Umpire_Scorer.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
		.then(resolve)
		.catch(reject)
})
