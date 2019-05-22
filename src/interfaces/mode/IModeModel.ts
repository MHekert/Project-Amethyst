import IMode from './IMode';
import { Document } from 'mongoose';

export default interface IModeModel extends Document, IMode {
	setDefaults(mode: IModeModel): IModeModel;
}
