import Mode from '../mode';

const removeRevision = (modeId: string, revisionId: string) =>
	Mode.updateOne({ _id: modeId }, { $pull: { revisions: { _id: revisionId } } }).exec();

export default removeRevision;
