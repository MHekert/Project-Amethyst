import { Schema } from 'mongoose';
import IFork from './IFork';

const Id = Schema.Types.ObjectId;

export default interface IMode {
	author: typeof Id;
	title: String;
	tags: [String];
	shortDescription: String;
	thumbnail: String;
	fork?: IFork;
	favorites: Number;
	points: Number;
	created: String;
	lastUpdated: String;
	lastVersion: typeof Id;
}
