import IModeAction from './IModeAction';
import { Document } from 'mongoose';

export default interface IModeActionModel extends IModeAction, Document {}
