import { describe, it } from 'mocha';
import { expect } from 'chai';
import { connection } from 'mongoose';
import Mode from '../../../../src/models/mode/mode';
import createDummyModes from '../../../dummyData/createDummyModes';
import { MONGODB_URI_TEST } from '../../../../src/util/secrets';
import ModeAction from '../../../../src/models/modeAction';
import User from '../../../../src/models/user';
import IUserModel from '../../../../src/interfaces/user/IUserModel';
import IModeModel from '../../../../src/interfaces/mode/IModeModel';
import joinModeActions from '../../../../src/models/mode/helpers/joinModeActions';
import { setUpvote } from '../../../../src/models/modeAction';

const mongoUri: string = MONGODB_URI_TEST;
let userId: IUserModel['_id'];
let modesPromise: Promise<Array<IModeModel>>;

describe(`mode's model helper function joinModeAction`, () => {
	before(async () => {
		await connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
		await Promise.all([Mode.deleteMany({}), ModeAction.deleteMany({})]);
		modesPromise = (async () => await Promise.all(createDummyModes()))();
		const userPromise = new User().save();
		await Promise.all([modesPromise, userPromise]);
		userId = (await userPromise)._id;
		const mode = (await modesPromise)[0]._id;
		await setUpvote(userId, mode);
	});

	after(async () => {
		await Promise.all([Mode.deleteMany({}), ModeAction.deleteMany({})]);
		return connection.close();
	});

	it('should work without optional parameters', async () => {
		const res = await joinModeActions(userId);
		expect(res).to.be.an('array');
		expect(res).to.have.length((await modesPromise).length);
	});

	it('should correctly pass additional steps to pipeline', async () => {
		const res = await joinModeActions(userId, { postJoinTransformPipeline: [{ $limit: 2 }] });
		expect(res).to.be.an('array');
		expect(res).to.have.length(2);
	});

	it('should correctly project when additional project object passed', async () => {
		const res = await joinModeActions(userId, { project: { author: 0 } });
		expect(res).to.be.an('array');
		res.forEach((el: IModeModel) => {
			expect(el).to.not.have.property('author');
			expect(el).to.not.have.property('__v');
		});
	});

	it('should correctly perform inner join when specified', async () => {
		const res = await joinModeActions(userId, { outerJoin: false });
		expect(res).to.be.an('array');
		expect(res).to.have.length(1);
	});
});
