import { Types } from 'mongoose';

import IRevision from '@interfaces/mode/IRevision';
import Mode from '@models/mode/mode';

const getRevision = async (modeId: string, quantity: number, offset: number) => {
	const idToSearch = Types.ObjectId(modeId);
	const mode: any = await Mode.aggregate([
		{ $match: { _id: idToSearch } },
		{
			$project: {
				revisions: { $slice: [{ $reverseArray: '$revisions' }, offset, quantity] },
				'revisions*': 1,
				_id: 0
			}
		}
	]).exec();
	const revisions: IRevision[] = mode.map((el: any) => el.revisions).flat();
	return revisions;
};

export default getRevision;
