import { describe, it } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import Mode from '../../src/models/mode';

import { MONGODB_URI } from '../../src/util/secrets';
import IModeModel from '../../src/interfaces/mode/IModeModel';
const mongoUri: string = MONGODB_URI;

mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

describe(`mode's model`, () => {
	const mode = new Mode();
	let saveResult: any;
	let updatedMode1: any;
	let updatedMode2: any;

	describe(`on saving new element`, () => {
		it(`should set up default values`, async () => {
			saveResult = mode.save();
			const result = await saveResult;
			expect(result).to.have.property('favorites', 0);
			expect(result).to.have.property('points', 0);
			expect(result).to.have.property('createdAt');
			expect(result).to.have.property('thumbnail');
		});
	});
	describe(`method to increment favorites`, () => {
		it(`should return model object with incremented favorites`, async () => {
			const result = await saveResult;
			const updateResult = await result.incFavorite();
			updatedMode1 = Mode.findOne({ _id: result._id });
			expect(await updatedMode1).to.have.property('favorites', 1);
			expect(updateResult).to.have.property('nModified', 1);
		});
	});
	describe(`method to decrement and increment points`, () => {
		it(`should update in order`, async () => {
			const pointsArray = [ 1, 1, 1, -1, -1, 1, 1, 1, 1, -1 ];
			const expectedPoints = pointsArray.reduce((a, b) => a + b);
			const result = await saveResult;
			const updateMap = pointsArray.map((el) => (el === 1 ? result.upvote() : result.downvote()));
			Promise.all(updateMap).then(async (values) => {
				values.forEach((el) => expect(el).to.have.property('nModified', 1));
				updatedMode2 = Mode.findOne({ _id: result._id });
				expect(await updatedMode2).to.have.property('points', expectedPoints);
			});
		});
	});
	describe(`object`, () => {
		it(`should delete correctly`, async () => {
			Promise.all([ updatedMode1, updatedMode2 ])
				.then(async () => {
					cleanUp(await saveResult);
				})
				.catch(async () => {
					cleanUp(await saveResult);
				});
		});
	});
});

const cleanUp = async (saved: IModeModel) => {
	const removed = await saved.remove();
	mongoose.connection.close();
	return expect(removed).to.be.deep.equal(saved);
};
