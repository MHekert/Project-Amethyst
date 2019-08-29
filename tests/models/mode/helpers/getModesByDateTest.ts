import { expect } from 'chai';
import { describe, it } from 'mocha';
import { connection } from 'mongoose';

import createDummyModes from '@dummy/createDummyModes';
import IModeModel from '@interfaces/mode/IModeModel';
import getModesByDate from '@models/mode/helpers/getModesByDate';
import Mode from '@models/mode/mode';
import { MONGODB_URI_TEST } from '@util/secrets';

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
			await Promise.all(createDummyModes());
			const res1 = await getModesByDate(null, quantity, dateS);
			expect(res1.length).to.be.equal(3);
			res1.forEach((el: IModeModel) => expect(new Date(el.createdAt)).at.most(date));
		});
	});
});
