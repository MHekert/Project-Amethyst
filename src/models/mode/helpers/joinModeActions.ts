import { isEmpty, isUndefined } from 'lodash';

import Mode, { defaultProjection } from '@models/mode/mode';
import ModeAction from '@models/modeAction';

const createUnwind = (reverseJoinOrder: boolean, outerJoin: boolean) => {
	const path = reverseJoinOrder ? '$mode' : '$actions';
	return {
		$unwind: {
			path,
			preserveNullAndEmptyArrays: outerJoin
		}
	};
};

const createLookup = (reverseJoinOrder: boolean, userId?: string) => {
	if (reverseJoinOrder)
		return {
			$lookup: {
				from: 'modes',
				localField: 'modeId',
				foreignField: '_id',
				as: 'mode'
			}
		};

	return {
		$lookup: {
			from: 'modeactions',
			let: {
				modeId: '$_id'
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [
								{
									$eq: ['$$modeId', '$modeId']
								},
								{
									$eq: [userId, '$userId']
								}
							]
						}
					}
				}
			],
			as: 'actions'
		}
	};
};

const joinModeActions = async (
	userId: string,
	args?: {
		match?: object;
		sort?: object;
		project?: object;
		skip?: number;
		limit?: number;
		postJoinTransformPipeline?: Array<object>;
		outerJoin?: boolean;
		reverseJoin?: boolean;
	}
) => {
	const _args = args || {};
	const match = _args.match || {};
	const sort = _args.sort || {};
	const limit = _args.limit || 10;
	const project = _args.project || {};
	const skip = _args.skip || 0;
	const outerJoin = isUndefined(_args.outerJoin) ? true : _args.outerJoin;
	const reverseJoin = isUndefined(_args.reverseJoin) ? false : _args.reverseJoin;
	const postJoinTransformPipeline = _args.postJoinTransformPipeline || [];

	const _replaceRoot = [];
	const _addFields = [];

	if (reverseJoin) {
		_replaceRoot.push({
			$replaceRoot: {
				newRoot: {
					$mergeObjects: ['$$ROOT', '$mode']
				}
			}
		});

		_addFields.push({
			$addFields: {
				'actions.upvote': '$upvote',
				'actions.favorite': '$favorite'
			}
		});
	}

	const _match = {
		$match: match
	};
	const _sort = {
		$sort: sort
	};
	const _skip = {
		$skip: skip
	};
	const _limit = {
		$limit: limit
	};

	const _project = {
		$project: {
			'actions.modeId': 0,
			'actions.userId': 0,
			'actions._id': 0,
			'actions.__v': 0,
			modeId: 0,
			userId: 0,
			upvote: 0,
			favorite: 0,
			mode: 0,
			...defaultProjection,
			...project
		}
	};

	const _lookup = createLookup(reverseJoin, userId);
	const _unwind = createUnwind(reverseJoin, outerJoin);

	const pipeline: Array<object> = [
		_match,
		_skip,
		_sort,
		_limit,
		_lookup,
		_unwind,
		..._replaceRoot,
		..._addFields,
		_project,
		...postJoinTransformPipeline
	];
	if (isEmpty(sort)) pipeline.splice(2, 1);
	if (reverseJoin) return ModeAction.aggregate(pipeline).exec();
	return Mode.aggregate(pipeline).exec();
};

export default joinModeActions;
