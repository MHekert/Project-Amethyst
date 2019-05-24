import { describe, it } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import Revision from '../../src/models/revision';
import { MONGODB_URI } from '../../src/util/secrets';
const mongoUri: string = MONGODB_URI;

mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

describe(`revision's model`, () => {
	describe(`on saving new element without required values`, () => {
		it(`should throw error`, async () => {
			try {
				const revision = new Revision();
				await revision.save();
			} catch (err) {
				expect(err).to.have.property('name', 'ValidationError');
			}
		});
	});

	describe(`method that returns next version number`, () => {
		it(`should return 1 when no other versions exist`, async () => {
			try {
				const revision = new Revision();
				revision.modeId = revision._id;
				const result = await revision.getNextVersionNumber();
				expect(result).to.be.equal(1);
			} catch (err) {
				expect(err).to.have.property('name', 'ValidationError');
			}
		});
	});
});
