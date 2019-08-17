import ModeAction from '../../src/models/modeAction';

export const dummyModeActionBody = {
	modeId: '5cf2a6fded450065969652b3',
	userId: '5cf2a6fded450065969652b3'
};

export const dummyModeAction = new ModeAction(dummyModeActionBody);

export const getDummyModeAction = () => ModeAction.findOne(dummyModeActionBody).exec();
