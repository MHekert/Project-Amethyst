import { Schema } from 'mongoose';

const Id = Schema.Types.ObjectId;

export default interface IRevision {
	modeId: typeof Id;
	changelog: [string];
	version: number;
	code: string;
	createdAt: Date;
	body: string;
	gallery: [string];
};
