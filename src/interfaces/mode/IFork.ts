import { Schema } from 'mongoose';

const Id = Schema.Types.ObjectId;

export default interface IFork {
	modeId: typeof Id;
	revisionId: typeof Id;
};
