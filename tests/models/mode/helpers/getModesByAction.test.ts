import { expect } from 'chai';

import { connectDB, disconnectDB } from '@config/mongoose';
import createDummyModes from '@dummy/createDummyModes';
import IModeModel from '@interfaces/mode/IModeModel';
import EAction from '@interfaces/modeAction/EAction';
import IUserModel from '@interfaces/user/IUserModel';
import getModesByAction from '@models/mode/helpers/getModesByAction';
import Mode from '@models/mode/mode';
import ModeAction from '@models/modeAction';
import { setDownvote, setFavorite, setUpvote } from '@models/modeAction';
import User from '@models/user';

let userId: IUserModel['_id'];
let modesPromise: Promise<Array<IModeModel>>;

describe(`mode's model helper function getModesByAction`, () => {
	before(async () => {
		await connectDB(true);
		await Promise.all([Mode.deleteMany({}), ModeAction.deleteMany({})]);
		modesPromise = createDummyModes();
		const userPromise = new User().save();
		await Promise.all([modesPromise, userPromise]);
		userId = (await userPromise)._id;
		const modes = await modesPromise;
		Promise.all([
			setUpvote(userId, modes[0]._id),
			setDownvote(userId, modes[1]._id),
			setFavorite(userId, modes[2]._id)
		]);
	});

	after(async () => {
		await Promise.all([Mode.deleteMany({}), ModeAction.deleteMany({})]);
		return disconnectDB();
	});

	it('should correctly retrieve upvoted modes', async () => {
		const res = await getModesByAction(userId, <EAction>'upvote', 10);
		expect(res).to.be.an('array');
		expect(res).to.have.length(1);
		expect(res[0]).to.nested.property('actions.upvote', true);
	});

	it('should correctly retrieve downvoted modes', async () => {
		const res = await getModesByAction(userId, <EAction>'downvote', 10);
		expect(res).to.be.an('array');
		expect(res).to.have.length(1);
		expect(res[0]).to.nested.property('actions.upvote', false);
	});

	it('should correctly retrieve favorite modes', async () => {
		const res = await getModesByAction(userId, <EAction>'favorite', 10);
		expect(res).to.be.an('array');
		expect(res).to.have.length(1);
		expect(res[0]).to.nested.property('actions.favorite', true);
	});
});
