import { Schema } from 'mongoose';
import IFork from './IFork';

const Id = Schema.Types.ObjectId;

export default interface IMode {
	author: typeof Id;
	title: string;
	tags: [string];
	shortDescription: string;
	thumbnail: string;
	fork?: IFork;
	favorites: number;
	points: number;
	created: string;
};
