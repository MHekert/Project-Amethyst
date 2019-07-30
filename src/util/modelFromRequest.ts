import { pick, merge } from 'lodash';
import { Model } from 'mongoose';
import getSchemaPaths from './getSchemaPaths';

export default (model: Model<any>, requestBody: any, pathsBlacklist: string[]) => {
	const pathsWhitelist = getSchemaPaths(model.schema).filter((el: any) => !pathsBlacklist.includes(el));
	const defaultModel = new model();
	const fromReq = pick(requestBody, pathsWhitelist);
	return merge(defaultModel, fromReq);
};
