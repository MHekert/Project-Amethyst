import { expect } from 'chai';
import { describe, it } from 'mocha';
import { connection } from 'mongoose';

import createDummyModes from '@dummy/createDummyModes';
import getModesByAuthor from '@models/mode/helpers/getModesByAuthor';
import Mode from '@models/mode/mode';
import { MONGODB_URI_TEST } from '@util/secrets';

const mongoUri: string = MONGODB_URI_TEST;

describe(`mode's model helper function getModesByAuthor`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return connection.close();
	});

	describe(`that returns modes by author`, () => {
		it(`should return correct documents`, async () => {
			const id = '507f1f77bcf86cd799439011';
			const quantity = 10;
			await Promise.all(createDummyModes());
			const res1 = await getModesByAuthor(id, quantity);
			expect(res1).to.have.length(5);
			res1.forEach((el: any) => expect(el.author.toString()).at.equal(id));
		});
	});
});
