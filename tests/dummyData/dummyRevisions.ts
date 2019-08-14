import Mode from '../../src/models/mode/mode';
import Revision from '../../src/models/mode/revision';
import modelFromRequest from '../../src/util/modelFromRequest';
import { correctBody } from '../dummyData/putModeBodyDummy';
import IModeModel from '../../src/interfaces/commentAction/ICommentActionModel';

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
