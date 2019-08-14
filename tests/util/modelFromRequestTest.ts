import { describe, it } from 'mocha';
import { expect } from 'chai';
import Mode from '../../src/models/mode/mode';
import modelFromRequest from '../../src/util/modelFromRequest';
import { correctBody } from '../dummyData/putModeBodyDummy';

describe(`modelFromRequest`, () => {
	it(`should return correct model`, () => {
		const modeModel = modelFromRequest(Mode, correctBody, []);
		expect(modeModel).to.include.keys(Object.keys(new Mode()));
	});

	it(`should return model without specified values`, () => {
		const modeModel = modelFromRequest(Mode, correctBody, ['tags']);
		expect(modeModel.tags).to.be.empty;
	});
});
