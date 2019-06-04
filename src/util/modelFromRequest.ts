import { pick, merge } from 'lodash';
import { Model } from 'mongoose';
import getModelPaths from './getModelPaths';

export default (schema: Model<any>, requestBody: any, pathsBlacklist: string[]) => {
	const pathsWhitelist = getModelPaths(schema).filter((el) => !pathsBlacklist.includes(el));
	const defaultModel = new schema();
	const fromReq = pick(requestBody, pathsWhitelist);
	return merge(defaultModel, fromReq);
};
