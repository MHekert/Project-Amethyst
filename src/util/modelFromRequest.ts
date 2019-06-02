import * as _ from 'lodash';
import { Model } from 'mongoose';
import getModelPaths from './getModelPaths';

export default (schema: Model<any>, requestBody: any, pathsBlacklist: string[]) => {
	const pathsWhitelist = getModelPaths(schema).filter((el) => !pathsBlacklist.includes(el));
	const defaultModel = new schema();
	const fromReq = _.pick(requestBody, pathsWhitelist);
	return _.merge(defaultModel, fromReq);
};
