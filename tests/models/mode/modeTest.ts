import { expect } from 'chai';
import { describe, it } from 'mocha';
import { connection } from 'mongoose';

import { correctBody } from '@dummy/putModeBodyDummy';
import Mode, { decPoints, getAuthor, incFavorite, incPoints } from '@models/mode/mode';
import { MONGODB_URI_TEST } from '@util/secrets';

const mongoUri: string = MONGODB_URI_TEST;

describe(`mode's model`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return connection.close();
	});

	describe(`on saving new element`, () => {
		it(`should set up default values`, async () => {
			const mode = await getDummyMode();
			expect(mode).to.have.property('favorites', 0);
			expect(mode).to.have.property('points', 0);
			expect(mode).to.have.property('createdAt');
			expect(mode).to.have.property('thumbnail');
		});
	});
	describe(`helper function to increment favorites`, () => {
		it(`should return model object with incremented favorites`, async () => {
			const mode = await getDummyMode();
			const updateResult = await incFavorite(mode._id);
			const updatedMode = await Mode.findOne({ _id: mode._id });
			expect(updatedMode).to.have.property('favorites', 1);
			expect(updateResult).to.have.property('nModified', 1);
		});
	});
	describe(`helper function to decrement and increment points`, () => {
		it(`should update in order`, async () => {
			const mode = await getDummyMode();
			const pointsArray = [1, 1, 1, -1, -1, 1, 1, 1, 1, -1];
			const expectedPoints = pointsArray.reduce((a, b) => a + b);
			const updateMap = pointsArray.map((el) => (el === 1 ? incPoints(mode._id) : decPoints(mode._id)));
			updateMap.forEach(async (el) => expect(await el).to.have.property('nModified', 1));
			await Promise.all(updateMap);
			const updatedMode = await Mode.findOne({ _id: mode._id });
			expect(updatedMode).to.have.property('points', expectedPoints);
		});
	});
	describe(`object`, () => {
		it(`should delete correctly`, async () => {
			const mode = await getDummyMode();
			const removed = await mode.remove();
			expect(removed).to.be.deep.equal(mode);
		});
	});

	describe(`helper function that retrieves mode's author`, () => {
		it(`should return author`, async () => {
			const mode = await getDummyMode(correctBody);
			const author = await getAuthor(mode._id);
			expect(author).to.be.deep.equal(mode.author);
		});
	});
});

const getDummyMode = (object = {}) => new Mode(object).save();
