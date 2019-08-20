import { describe, it } from 'mocha';
import { expect } from 'chai';
import { connection } from 'mongoose';
import Mode from '../../../../src/models/mode/mode';
import getModesByAuthor from '../../../../src/models/mode/helpers/getModesByAuthor';
import createDummyModes from '../../../dummyData/createDummyModes';
import { MONGODB_URI_TEST } from '../../../../src/util/secrets';
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
