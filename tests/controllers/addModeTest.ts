process.env.NODE_ENV = 'test';
import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import { MONGODB_URI } from '../../src/util/secrets';
import chaiHttp from 'chai-http';
import * as _ from 'lodash';
import Mode from '../../src/models/mode';
import Revision from '../../src/models/revision';
import app, { server } from '../../src/server';
import { correctBody, incorrectBody } from '../dummyData/putModeBodyDummy';
const mongoUri: string = MONGODB_URI;
chai.use(chaiHttp);

describe(`PUT on path /mode/add`, () => {
	before(async () => {
		return mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	beforeEach(async () => {
		return Promise.all([ Mode.deleteMany({}), Revision.deleteMany({}) ]);
	});
	after(async () => {
		await Promise.all([ Mode.deleteMany({}), Revision.deleteMany({}) ]);
		server.close();
		return mongoose.connection.close();
	});

	describe(`with correct body`, () => {
		it(`should return object with nested mode and revision objects and status code 200`, (done) => {
			chai
				.request(app)
				.put('/mode/add')
				.set('content-type', 'application/json')
				.send(correctBody)
				.end((err, res) => {
					expect(res).have.status(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('mode');
					expect(res.body).to.have.property('revision');
					done();
				});
		});
	});
	describe(`with incorrect body`, () => {
		it(`should return object with error description and status code 400`, (done) => {
			chai
				.request(app)
				.put('/mode/add')
				.set('content-type', 'application/json')
				.send(incorrectBody)
				.end((err, res) => {
					expect(res).have.status(400);
					expect(res.body.error).to.be.an('object');
					expect(res.body.error).to.have.property('message', 'Wrong params in body');
					expect(res.body.error).to.have.property('status', 400);
					done();
				});
		});
	});
});
