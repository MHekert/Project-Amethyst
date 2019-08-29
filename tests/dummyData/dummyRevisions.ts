import { correctBody } from '@dummy/putModeBodyDummy';
import IModeModel from '@interfaces/commentAction/ICommentActionModel';
import Mode from '@models/mode/mode';
import Revision from '@models/mode/revision';
import modelFromRequest from '@util/modelFromRequest';

export const createDummyRevisions = async () => {
	const modeModel: IModeModel = modelFromRequest(Mode, correctBody, []);
	const revisionModel = modelFromRequest(Revision, correctBody, []);
	const mode = await modeModel.save();
	await revisionModel.insertToMode(mode._id);
	const nextRev1 = new Revision();
	nextRev1.code = 'code2';
	await nextRev1.insertToMode(mode._id);
	const nextRev2 = new Revision();
	nextRev2.code = 'code3';
	return nextRev2.insertToMode(mode._id);
};
