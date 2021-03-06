import { isEmpty, pick } from 'lodash';

import IRevision from '@interfaces/mode/IRevision';
import Mode from '@models/mode/mode';

const updateRevision = async (
	modeId: string,
	revisionId: string,
	changes: Partial<Omit<IRevision, 'createdAt'>>
) => {
	const _changes: any = pick(changes, ['body', 'changelog', 'code']);
	if (isEmpty(_changes)) return null;
	const updateObject: any = {};
	for (const key in _changes) {
		updateObject[`revisions.$.${key}`] = _changes[key];
	}
	const match = { _id: modeId, 'revisions._id': revisionId };
	return Mode.updateOne(match, updateObject).exec();
};

export default updateRevision;
