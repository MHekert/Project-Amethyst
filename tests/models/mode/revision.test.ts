import { expect } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import Revision from '@models/mode/revision';

describe(`revision's model`, () => {
	before(async () => connectDB(true));
	after(async () => disconnectDB());

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
