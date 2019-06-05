process.env.NODE_ENV = 'test';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import { MONGODB_URI } from '../../src/util/secrets';
import chaiHttp from 'chai-http';
import * as _ from 'lodash';

import app, { server } from '../../src/server';
import Revision from '../../src/models/revision';
import createDummyRevisions, { modeId } from '../dummyData/dummyRevisions';

const mongoUri: string = MONGODB_URI;
chai.use(chaiHttp);

describe(`GET on path`, () => {
	before(async () => {
		await mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
		await Revision.deleteMany({});
		return createDummyRevisions();
	});

	after(async () => {
		await server.close();
		await Revision.deleteMany({});
		return mongoose.connection.close();
	});

	describe(`/revisions/:modeId/:offset? with correct modeId and offset`, () => {
		it(`should return array with correct objects and status code 200`, (done) => {
			chai.request(app).get(`/revisions/${modeId}/2`).end((err, res) => {
				expect(res).have.status(200);
				expect(_.isArray(res.body)).to.equal(true);
				expect(res.body.length).to.equal(10);
				expect(res.body[0].version).to.equal(13);
				expect(res.body[res.body.length - 1].version).to.equal(4);
				done();
			});
		});
	});

	describe(`/revisions/:modeId/:offset? without offset`, () => {
		it(`should return array with correct objects and status code 200`, (done) => {
			chai.request(app).get(`/revisions/${modeId}`).end((err, res) => {
				expect(res).have.status(200);
				expect(_.isArray(res.body)).to.equal(true);
				expect(res.body.length).to.equal(10);
				expect(res.body[0].version).to.equal(15);
				expect(res.body[res.body.length - 1].version).to.equal(6);
				done();
			});
		});
	});

	describe(`/revisions/:modeId/:offset? with sting in offset's place`, () => {
		it(`should return message and status code 400`, (done) => {
			chai.request(app).get(`/revisions/${modeId}/wrong_param`).end((err, res) => {
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
				done();
			});
		});
	});
});
