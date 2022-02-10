import { Teams } from '../../models/index.js';


//Find Team detail
export const findTeamDetail = async (condition = {}) => await Teams.findOne(condition).exec();

//Add Team
export const addTeam = async (payload = {}) => {
	let teams = new Teams(payload);
	return teams.save();
};

// //Find Team by Id
export const findTeamById = (search = {}) => new Promise((resolve, reject) => {
	Teams.findOne(search).select('-password')
		.populate('participants.userId')
		.then(resolve)
		.catch(reject)
});

//Update Team
export const updateTeamDetails = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
	Teams.findOneAndUpdate(condition, { $set: userprops }, { new: true })
		.then(resolve)
		.catch(reject);
});

//Find all Teams
export const findAllTeams = (search = {}, skip, limit) => new Promise((resolve, reject) => {
	Teams.find(search)
		.populate('participants.userId')
		.skip(skip).limit(limit)
		.sort('-createdAt')
		.then(resolve)
		.catch(reject)
});


//Get count
export const getTeamsCount = (search) => new Promise((resolve, reject) => {
	Teams.count(search)
		.then(resolve)
		.catch(reject)
});

//Delete Team
export const deleteTeams = (id) => new Promise((resolve, reject) => {
	Teams.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
		.then(resolve)
		.catch(reject)
})
