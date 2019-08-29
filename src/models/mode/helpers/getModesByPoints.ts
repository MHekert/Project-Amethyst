import { min } from 'lodash';

import IModeModel from '@interfaces/mode/IModeModel';
import IUserModel from '@interfaces/user/IUserModel';
import joinModeActions from '@models/mode/helpers/joinModeActions';
import Mode, { defaultProjection } from '@models/mode/mode';

const sort = { points: -1 };

const getPoints = async (ids: string[]) => {
	const modes = await Mode.find({ _id: { $in: ids } }).exec();
	const points = modes.map((el: IModeModel) => el.points);
	return min(points);
};

const getModesByPointsInitial = async (user: IUserModel, quantity: number) => {
	if (user) return joinModeActions(user._id, { sort, limit: quantity, project: defaultProjection });
	return Mode.find()
		.sort(sort)
		.limit(quantity)
		.select(defaultProjection)
		.exec();
};

const getModesByPointsOffset = async (user: IUserModel, quantity: number, ids: string[]) => {
	const points = await getPoints(ids);
	const match = { points: { $lt: points } };
	if (user)
		return joinModeActions(user._id, {
			match,
			sort,
			limit: quantity,
			project: defaultProjection
		});
	return Mode.find(match)
		.sort(sort)
		.limit(quantity)
		.select(defaultProjection)
		.exec();
};

const getModesByPoints = async (user: IUserModel, quantity: number, ids?: string[]) => {
	if (!ids) return getModesByPointsInitial(user, quantity);
	return getModesByPointsOffset(user, quantity, ids);
};

export default getModesByPoints;
