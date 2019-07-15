import { describe, it } from 'mocha';
import { expect } from 'chai';
import { connection } from 'mongoose';
import ModeAction from '../../src/models/modeAction';
import { MONGODB_URI_TEST } from '../../src/util/secrets';
import { dummyModeAction, getDummyModeAction } from '../dummyData/dummyModeAction';
const mongoUri: string = MONGODB_URI_TEST;

describe(`modeAction's model`, () => {
	before(async () => {
		return connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	beforeEach(async () => {
		return ModeAction.deleteMany({});
	});
	after(async () => {
		await ModeAction.deleteMany({});
		return connection.close();
	});

	describe(`on creating new document`, () => {
		it(`should set up favorite to default value`, async () => {
			const modeAction = await dummyModeAction.save();
			expect(modeAction).to.have.property('favorite', false);
			expect(modeAction).to.have.property('upvote', undefined);
		});
	});

	describe(`on running setUpvote method`, () => {
		it(`should set up favorite to default value and upvote as true`, async () => {
			const modeAction = await getDummyModeAction(await dummyModeAction.setUpvote());
			expect(modeAction).to.have.property('favorite', false);
			expect(modeAction).to.have.property('upvote', true);
		});
	});

	describe(`on running setDownvote method`, () => {
		it(`should set up favorite to default value and upvote as false`, async () => {
			const modeAction = await getDummyModeAction(await dummyModeAction.setDownvote());
			expect(modeAction).to.have.property('favorite', false);
			expect(modeAction).to.have.property('upvote', false);
		});
	});

	describe(`on running unsetVote method`, () => {
		it(`should set up favorite to default value and unset upvote property`, async () => {
			const modeAction = await getDummyModeAction(await dummyModeAction.unsetVote());
			expect(modeAction).to.have.property('favorite', false);
			expect(modeAction).to.have.property('upvote', undefined);
		});
	});

	describe(`on running setUpvote method and setDownvote`, () => {
		it(`should set up favorite to default value and upvote as false`, async () => {
			const id: string = (await dummyModeAction.setUpvote()).upserted[0]._id;
			await (await ModeAction.findById(id)).setDownvote();
			const modeAction = await ModeAction.findById(id);
			expect(modeAction).to.have.property('favorite', false);
			expect(modeAction).to.have.property('upvote', false);
		});
	});

	describe(`on running setFavorite method`, () => {
		it(`should set up favorite as true`, async () => {
			const modeAction = await getDummyModeAction(await dummyModeAction.setFavorite());
			expect(modeAction).to.have.property('favorite', true);
			expect(modeAction).to.have.property('upvote', undefined);
		});
	});

	describe(`on running unsetFavorite method`, () => {
		it(`should set up favorite as false`, async () => {
			const modeAction = await getDummyModeAction(await dummyModeAction.unsetFavorite());
			expect(modeAction).to.have.property('favorite', false);
			expect(modeAction).to.have.property('upvote', undefined);
		});
	});
});
