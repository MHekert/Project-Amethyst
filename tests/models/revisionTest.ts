process.env.NODE_ENV = 'test';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import Revision from '../../src/models/revision';
import correctBody from '../dummyData/dummyRevisionCorrectBody';
import modelFromRequest from '../../src/util/modelFromRequest';
import { MONGODB_URI } from '../../src/util/secrets';
const mongoUri: string = MONGODB_URI;

describe(`revision's model`, () => {
	before(async () => {
		return mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	beforeEach(async () => {
		return Revision.deleteMany({});
	});
	after(async () => {
		await Revision.deleteMany({});
		return mongoose.connection.close();
	});

	describe(`on saving new element without required values`, () => {
		it(`should throw error`, async () => {
			try {
				const revision = new Revision();
				const res = await revision.save();
				expect(res).to.have.property('name', 'ValidationError');
			} catch (err) {
				expect(err).to.have.property('name', 'ValidationError');
			}
		});
	});

	describe(`method that returns next version number when no other versions exist`, () => {
		it(`should return 1`, async () => {
			const revision = new Revision();
			revision.modeId = revision._id;
			const result = revision.getNextVersionNumber();
			expect(await result).to.be.equal(1);
			return result;
		});
	});

	describe(`method that returns next version number when one other versions exist`, () => {
		it(`should return 2 `, async () => {
			const revision = modelFromRequest(Revision, correctBody, []);
			await revision.save();
			const result = revision.getNextVersionNumber();
			expect(await result).to.be.equal(2);
			return result;
		});
	});
});
