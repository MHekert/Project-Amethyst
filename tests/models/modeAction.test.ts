import { expect } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import { dummyModeAction, dummyModeActionBody, getDummyModeAction } from '@dummy/dummyModeAction';
import ModeAction, {
	setDownvote,
	setFavorite,
	setUpvote,
	unsetFavorite,
	unsetVote
} from '@models/modeAction';

describe(`modeAction's model`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => ModeAction.deleteMany({}));
	after(async () => {
		await ModeAction.deleteMany({});
		return disconnectDB();
	});

	describe(`on creating new document`, () => {
		it(`should not set up favorite nor upvote`, async () => {
			const modeAction = await dummyModeAction.save();
			expect(modeAction).to.have.property('favorite', undefined);
			expect(modeAction).to.have.property('upvote', undefined);
		});
	});

	describe(`on running setUpvote function`, () => {
		it(`should set up upvote as true`, async () => {
			const modeAction = await preformAction(setUpvote);
			expect(modeAction).to.have.property('favorite', undefined);
			expect(modeAction).to.have.property('upvote', true);
		});
	});

	describe(`on running setDownvote function`, () => {
		it(`should set up upvote as false`, async () => {
			const modeAction = await preformAction(setDownvote);
			expect(modeAction).to.have.property('favorite', undefined);
			expect(modeAction).to.have.property('upvote', false);
		});
	});

	describe(`on running unsetVote function`, () => {
		it(`should unset upvote property`, async () => {
			const modeAction = await preformAction(unsetVote);
			expect(modeAction).to.have.property('favorite', undefined);
			expect(modeAction).to.have.property('upvote', undefined);
		});
	});

	describe(`on running setUpvote function and setDownvote`, () => {
		it(`should set up upvote as false`, async () => {
			await preformAction(setUpvote);
			const modeAction = await preformAction(setDownvote);
			expect(modeAction).to.have.property('favorite', undefined);
			expect(modeAction).to.have.property('upvote', false);
		});
	});

	describe(`on running setFavorite function`, () => {
		it(`should set up favorite as true`, async () => {
			const modeAction = await preformAction(setFavorite);
			expect(modeAction).to.have.property('favorite', true);
			expect(modeAction).to.have.property('upvote', undefined);
		});
	});

	describe(`on running unsetFavorite function`, () => {
		it(`should set up favorite as false`, async () => {
			const modeAction = await preformAction(unsetFavorite);
			expect(modeAction).to.have.property('favorite', undefined);
			expect(modeAction).to.have.property('upvote', undefined);
		});
	});
});

const preformAction = async (modeActionFunc: any) => {
	await dummyModeAction.save();
	await modeActionFunc(dummyModeActionBody.userId, dummyModeActionBody.modeId);
	return getDummyModeAction();
};
