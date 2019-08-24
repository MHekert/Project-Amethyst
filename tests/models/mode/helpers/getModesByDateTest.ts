import { describe, it } from 'mocha';
import { expect } from 'chai';
import { connection } from 'mongoose';
import Mode from '../../../../src/models/mode/mode';
import getModesByDate from '../../../../src/models/mode/helpers/getModesByDate';
import createDummyModes from '../../../dummyData/createDummyModes';
import { MONGODB_URI_TEST } from '../../../../src/util/secrets';
const mongoUri: string = MONGODB_URI_TEST;

describe(`mode's model helper function getModesByDate`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return connection.close();
	});

	describe(`that returns modes by date`, () => {
		it(`should return correct documents`, async () => {
			const date = new Date('2019-05-28');
			const dateS = date.toISOString();
			const quantity = 10;
			await createDummyModes();
			const res1 = await getModesByDate(quantity, dateS);
			expect(res1.length).to.be.equal(3);
			res1.forEach((el) => expect(new Date(el.createdAt)).at.most(date));
		});
	});
});
