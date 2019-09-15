import { expect } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import createDummyModes from '@dummy/createDummyModes';
import getModesByAuthor from '@models/mode/helpers/getModesByAuthor';
import Mode from '@models/mode/mode';

describe(`mode's model helper function getModesByAuthor`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	describe(`that returns modes by author`, () => {
		it(`should return correct documents`, async () => {
			const id = '507f1f77bcf86cd799439011';
			const quantity = 10;
			await createDummyModes();
			const res1 = await getModesByAuthor(null, id, quantity);
			expect(res1).to.have.length(5);
			res1.forEach((el: any) => expect(el.author.toString()).at.equal(id));
		});
	});
});
