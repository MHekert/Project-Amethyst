import EAction from '@interfaces/modeAction/EAction';
import IUserModel from '@interfaces/user/IUserModel';
import joinModeActions from '@models/mode/helpers/joinModeActions';

const getModesByAction = (
	userId: IUserModel['_id'],
	action: EAction,
	quantity: number,
	offset = 0
) => {
	let matchAction;
	if (action === 'upvote') matchAction = { upvote: true };
	if (action === 'downvote') matchAction = { upvote: false };
	if (action === 'favorite') matchAction = { favorite: true };
	const match = { userId, ...matchAction };
	return joinModeActions(userId, {
		match,
		outerJoin: false,
		reverseJoin: true,
		skip: offset,
		limit: quantity
	});
};

export default getModesByAction;
