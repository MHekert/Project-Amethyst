import { describe, it } from 'mocha';
import { expect } from 'chai';
import { connection } from 'mongoose';
import Revision from '../../../src/models/mode/revision';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
const mongoUri: string = MONGODB_URI_TEST;

describe(`revision's model`, () => {
	before(async () => {
		return connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	after(async () => {
		return connection.close();
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
});
