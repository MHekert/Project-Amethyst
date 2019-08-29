import { expect } from 'chai';
import { describe, it } from 'mocha';

import { correctBody } from '@dummy/putModeBodyDummy';
import Mode from '@models/mode/mode';
import modelFromRequest from '@util/modelFromRequest';

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
