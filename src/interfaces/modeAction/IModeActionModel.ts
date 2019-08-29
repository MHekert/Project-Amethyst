import { Document } from 'mongoose';

import IModeAction from '@interfaces/modeAction/IModeAction';

export default interface IModeActionModel extends IModeAction, Document {}
