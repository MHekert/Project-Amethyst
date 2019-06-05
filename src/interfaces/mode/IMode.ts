import IFork from './IFork';

export default interface IMode {
	author: string;
	title: string;
	tags: [string];
	shortDescription: string;
	thumbnail: string;
	fork?: IFork;
	favorites: number;
	points: number;
	createdAt: string;
};
