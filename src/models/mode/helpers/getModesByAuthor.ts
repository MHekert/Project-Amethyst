import IUserModel from '../../../../src/interfaces/user/IUserModel';
import Mode, { defaultProjection } from '../mode';
import joinModeActions from './joinModeActions';

const sort = { createdAt: -1 };

const getModesByAuthor = (user: IUserModel, author: string, quantity: number, offset = 0) => {
	const match = { author: author };
	if (user)
		return joinModeActions(user._id, {
			match: match,
			sort: sort,
			skip: offset,
			limit: quantity,
			project: defaultProjection
		});
	return Mode.find({ author: author })
		.sort({ createdAt: -1 })
		.skip(offset)
		.limit(quantity)
		.select(defaultProjection)
		.exec();
};

export default getModesByAuthor;
