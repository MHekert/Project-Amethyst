import IRevision from './IRevision';
import { Document } from 'mongoose';

export default interface IRevisionModel extends IRevision, Document {}
