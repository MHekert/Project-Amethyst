import ICommentAction from './ICommentAction';
import { Document } from 'mongoose';

export default interface IModeModel extends ICommentAction, Document {};
