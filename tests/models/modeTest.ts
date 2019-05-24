import { describe, it } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import Mode from '../../src/models/mode';

import { MONGODB_URI } from '../../src/util/secrets';
import IModeModel from '../../src/interfaces/mode/IModeModel';
const mongoUri: string = MONGODB_URI;

describe(`mode's model`, () => {
	before(() => {
		mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	after(() => {
		mongoose.connection.close();
	});

	describe(`on saving new element`, () => {
		it(`should set up default values`, async () => {
			const mode = await getDummyMode();
			expect(mode).to.have.property('favorites', 0);
			expect(mode).to.have.property('points', 0);
			expect(mode).to.have.property('createdAt');
			expect(mode).to.have.property('thumbnail');
			cleanUp(mode);
		});
	});
	describe(`method to increment favorites`, () => {
		it(`should return model object with incremented favorites`, async () => {
			const mode = await getDummyMode();
			const updateResult = await mode.incFavorite();
			const updatedMode = await Mode.findOne({ _id: mode._id });
			expect(updatedMode).to.have.property('favorites', 1);
			expect(updateResult).to.have.property('nModified', 1);
			cleanUp(mode);
		});
	});
	describe(`method to decrement and increment points`, () => {
		it(`should update in order`, async () => {
			const mode = await getDummyMode();
			const pointsArray = [ 1, 1, 1, -1, -1, 1, 1, 1, 1, -1 ];
			const expectedPoints = pointsArray.reduce((a, b) => a + b);
			const updateMap = pointsArray.map((el) => (el === 1 ? mode.upvote() : mode.downvote()));
			Promise.all(updateMap)
				.then(async (values) => {
					values.forEach((el) => expect(el).to.have.property('nModified', 1));
					const updatedMode = await Mode.findOne({ _id: mode._id });
					expect(updatedMode).to.have.property('points', expectedPoints);
				})
				.then(() => cleanUp(mode));
		});
	});
	describe(`object`, () => {
		it(`should delete correctly`, async () => {
			const mode = await getDummyMode();
			const removed = await mode.remove();
			expect(removed).to.be.deep.equal(mode);
		});
	});
});

const cleanUp = async (saved: IModeModel) => {
	saved.remove();
};

const getDummyMode = () => new Mode().save();
