import ModeAction from '../../src/models/modeAction';

export const dummyModeAction = new ModeAction({
	modeId: '5cf2a6fded450065969652b3',
	userId: '5cf2a6fded450065969652b3'
});

export const getDummyModeAction = (upsertVal: any) => ModeAction.findById(upsertVal.upserted[0]._id);
