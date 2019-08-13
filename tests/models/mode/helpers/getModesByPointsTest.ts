import { describe, it } from 'mocha';
import { expect } from 'chai';
import { connection } from 'mongoose';
import Mode from '../../../../src/models/mode/mode';
import getModesByPoints from '../../../../src/models/mode/helpers/getModesByPoints';
import createDummyModes from '../../../dummyData/createDummyModes';
import getDummyIds from '../../../dummyData/getDummyIds';
import { MONGODB_URI_TEST } from '../../../../src/util/secrets';
const mongoUri: string = MONGODB_URI_TEST;

describe(`mode's model helper function getModesByPoints`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return connection.close();
	});

	describe(`with ids param`, () => {
		it(`should return correct documents`, async () => {
			const quantity = 10;
			const dummyIds: string[] = await getDummyIds();
			const res1 = await getModesByPoints(quantity, await dummyIds.slice(1, 4));
			expect(res1.length).to.be.equal(2);
			res1.forEach((el: any) => expect(el.points).at.most(30));
		});
	});

	describe(`fwith ids param`, () => {
		it(`should return correctly limited documents`, async () => {
			const quantity = 1;
			const dummyIds: string[] = await getDummyIds();
			const res1 = await getModesByPoints(quantity, await dummyIds.slice(1, 4));
			expect(res1.length).to.be.equal(1);
			res1.forEach((el: any) => expect(el.points).at.most(30));
		});
	});

	describe(`without ids param`, () => {
		it(`should return correct documents`, async () => {
			const quantity = 3;
			await Promise.all(createDummyModes());
			const res1 = await getModesByPoints(quantity);
			expect(res1.length).to.be.equal(3);
			res1.forEach((el: any) => expect(el.points).to.be.equal(60));
		});
	});
});
