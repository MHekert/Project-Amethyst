import { Schema } from 'mongoose';

const Id = Schema.Types.ObjectId;

export default interface IComment {
	author: typeof Id;
	mode: typeof Id;
	replyTo: typeof Id;
	points: Number;
	body: String;
};
