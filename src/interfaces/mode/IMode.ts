import IFork from './IFork';
import IRevision from './IRevision';

export default interface IMode {
	author: string;
	title: string;
	tags: string[];
	shortDescription: string;
	thumbnail: string;
	fork?: IFork;
	favorites: number;
	points: number;
	createdAt: string;
	gallery: string[];
	revisions?: IRevision[];
	actualCode: string;
}
