import { expect } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import createDummyModes from '@dummy/createDummyModes';
import getDummyIds from '@dummy/getDummyIds';
import getModesByPoints from '@models/mode/helpers/getModesByPoints';
import Mode from '@models/mode/mode';

describe(`mode's model helper function getModesByPoints`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	describe(`with ids param`, () => {
		it(`should return correct documents`, async () => {
			const quantity = 10;
			const dummyIds: string[] = await getDummyIds();
			const res1 = await getModesByPoints(null, quantity, await dummyIds.slice(1, 2));
			expect(res1.length).to.be.equal(3);
			res1.forEach((el: any) => expect(el.points).at.most(30));
		});
	});

	describe(`with ids param`, () => {
		it(`should return correctly limited documents`, async () => {
			const quantity = 1;
			const dummyIds: string[] = await getDummyIds();
			const res1 = await getModesByPoints(null, quantity, await dummyIds.slice(1, 2));
			expect(res1.length).to.be.equal(1);
			res1.forEach((el: any) => expect(el.points).at.most(30));
		});
	});

	describe(`without ids param`, () => {
		it(`should return correct documents`, async () => {
			const quantity = 3;
			await createDummyModes();
			const res1 = await getModesByPoints(null, quantity);
			expect(res1.length).to.be.equal(3);
			res1.forEach((el: any) => expect(el.points).to.be.equal(60));
		});
	});
});
