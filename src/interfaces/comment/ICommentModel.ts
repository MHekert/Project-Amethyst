import IComment from './IComment';
import { Document } from 'mongoose';

export default interface IModeModel extends IComment, Document {}
