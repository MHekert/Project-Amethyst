import { Schema } from 'mongoose';

const Id = Schema.Types.ObjectId;

export default interface IModeAction {
	userId: typeof Id;
	modeId: typeof Id;
	upvote?: Boolean;
	favorite?: Boolean;
};
