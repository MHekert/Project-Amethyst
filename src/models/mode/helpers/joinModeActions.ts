import { isEmpty, isUndefined } from 'lodash';
import Mode, { defaultProjection } from '../mode';

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
	}
) => {
	const _args = args || {};
	const match = _args.match || {};
	const sort = _args.sort || {};
	const limit = _args.limit || 10;
	const project = _args.project || {};
	const skip = _args.skip || 0;
	const outerJoin = isUndefined(_args.outerJoin) ? true : _args.outerJoin;
	const postJoinTransformPipeline = _args.postJoinTransformPipeline || [];

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
			...defaultProjection,
			...project
		}
	};

	const _lookup = {
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

	const _unwind = {
		$unwind: {
			path: '$actions',
			preserveNullAndEmptyArrays: outerJoin
		}
	};

	const pipeline: Array<object> = [
		_match,
		_skip,
		_lookup,
		_sort,
		_limit,
		_unwind,
		_project,
		...postJoinTransformPipeline
	];
	if (isEmpty(sort)) pipeline.splice(3, 1);
	return Mode.aggregate(pipeline).exec();
};

export default joinModeActions;
