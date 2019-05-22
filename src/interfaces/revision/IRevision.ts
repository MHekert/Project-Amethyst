import { Schema } from 'mongoose';

const Id = Schema.Types.ObjectId;

export default interface IRevision {
	modeId: typeof Id;
	changelog: [String];
	version: Number;
	code: String;
	created: Date;
	body: String;
	gallery: [String];
}
