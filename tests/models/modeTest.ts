process.env.NODE_ENV = 'test';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import Mode, { getModesByDate, getModesByPoints } from '../../src/models/mode';
import createDummyModes from '../dummyData/dummyModes';
import { MONGODB_URI } from '../../src/util/secrets';
const mongoUri: string = MONGODB_URI;

describe(`mode's model`, () => {
	before(async () => {
		return mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	beforeEach(async () => {
		return Mode.deleteMany({});
	});
	after(async () => {
		await Mode.deleteMany({});
		return mongoose.connection.close();
	});

	describe(`on saving new element`, () => {
		it(`should set up default values`, async () => {
			const mode = await getDummyMode();
			expect(mode).to.have.property('favorites', 0);
			expect(mode).to.have.property('points', 0);
			expect(mode).to.have.property('createdAt');
			expect(mode).to.have.property('thumbnail');
			return new Promise((resolve) => resolve());
		});
	});
	describe(`method to increment favorites`, () => {
		it(`should return model object with incremented favorites`, async () => {
			const mode = await getDummyMode();
			const updateResult = await mode.incFavorite();
			const updatedMode = await Mode.findOne({ _id: mode._id });
			expect(updatedMode).to.have.property('favorites', 1);
			expect(updateResult).to.have.property('nModified', 1);
			return new Promise((resolve) => resolve());
		});
	});
	describe(`method to decrement and increment points`, () => {
		it(`should update in order`, async () => {
			const mode = await getDummyMode();
			const pointsArray = [ 1, 1, 1, -1, -1, 1, 1, 1, 1, -1 ];
			const expectedPoints = pointsArray.reduce((a, b) => a + b);
			const updateMap = pointsArray.map((el) => (el === 1 ? mode.upvote() : mode.downvote()));
			return Promise.all(updateMap)
				.then(async (values) => {
					values.forEach((el) => expect(el).to.have.property('nModified', 1));
					const updatedMode = await Mode.findOne({ _id: mode._id });
					expect(updatedMode).to.have.property('points', expectedPoints);
				})
				.then(async () => new Promise((resolve) => resolve()));
		});
	});
	describe(`object`, () => {
		it(`should delete correctly`, async () => {
			const mode = await getDummyMode();
			const removed = await mode.remove();
			expect(removed).to.be.deep.equal(mode);
			return new Promise((resolve) => resolve());
		});
	});

	describe(`funtion that returns modes by date`, () => {
		it(`should return correct documents`, async () => {
			const date = new Date('2019-05-28');
			const dateS = date.toISOString();
			const points = 45;
			const quantity = 10;
			await Promise.all(createDummyModes());
			const res1 = await getModesByDate(quantity, dateS, points);
			expect(res1.length).to.be.at.most(quantity);
			res1.forEach((el) => {
				expect(new Date(el.createdAt)).at.most(date);
				expect(el.points).at.below(points);
			});
			return new Promise((resolve) => resolve());
		});
	});

	describe(`funtion that returns modes by points`, () => {
		it(`should return correct documents`, async () => {
			const date = new Date('2019-05-28');
			const dateS = date.toISOString();
			const points = 45;
			const quantity = 10;
			await Promise.all(createDummyModes());
			const res1 = await getModesByPoints(quantity, dateS, points);
			expect(res1.length).to.be.at.most(quantity);
			res1.forEach((el) => {
				expect(new Date(el.createdAt)).be.below(date);
				expect(el.points).at.most(points);
			});
			return new Promise((resolve) => resolve());
		});
	});
});

const getDummyMode = () => new Mode().save();
