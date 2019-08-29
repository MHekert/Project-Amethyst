import { expect } from 'chai';
import { describe, it } from 'mocha';
import { connection } from 'mongoose';

import createDummyModes from '@dummy/createDummyModes';
import IModeModel from '@interfaces/mode/IModeModel';
import IUserModel from '@interfaces/user/IUserModel';
import joinModeActions from '@models/mode/helpers/joinModeActions';
import Mode from '@models/mode/mode';
import ModeAction from '@models/modeAction';
import { setUpvote } from '@models/modeAction';
import User from '@models/user';
import { MONGODB_URI_TEST } from '@util/secrets';

const mongoUri: string = MONGODB_URI_TEST;
let userId: IUserModel['_id'];
let modesPromise: Promise<Array<IModeModel>>;

describe(`mode's model helper function joinModeAction`, () => {
	before(async () => {
		await connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
		await Promise.all([Mode.deleteMany({}), ModeAction.deleteMany({})]);
		// modesPromise = (async () => await Promise.all(createDummyModes()))();
		modesPromise = <any>await createDummyModes();
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
