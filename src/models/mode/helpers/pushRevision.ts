import IRevision from '@interfaces/mode/IRevision';
import Mode from '@models/mode/mode';

const pushRevision = async (modeId: string, revision: IRevision) => {
	const mode = await Mode.findById(modeId).exec();
	mode.revisions.push(revision);
	return mode.save();
};

export default pushRevision;
