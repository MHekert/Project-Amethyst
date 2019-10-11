import { expect } from 'chai';
import { fill } from 'lodash';

import cleanId from '@util/cleanId';

describe(`cleanId`, () => {
	it(`should work properly for one object`, () => {
		const model = { _id: 'fakeId' };
		const cleanModel = cleanId(model);
		expect(cleanModel).to.have.property('id');
		expect(cleanModel).to.not.have.property('_id');
	});

	it(`should work properly for one array of objects`, () => {
		const model = fill(Array(3), { _id: 'fakeId' });
		const cleanModel = cleanId(model);
		cleanModel.forEach((el: any) => {
			expect(el).to.have.property('id');
			expect(el).to.not.have.property('_id');
		});
	});

	it(`should return unaltered object when _id property does not exists`, () => {
		const model = { test: 'test' };
		const cleanModel = cleanId(model);
		expect(cleanModel).to.be.deep.equal(model);
	});
});
