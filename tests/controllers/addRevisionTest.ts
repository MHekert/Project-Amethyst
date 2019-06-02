import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import { MONGODB_URI } from '../../src/util/secrets';
import chaiHttp from 'chai-http';
import * as _ from 'lodash';
import Revision from '../../src/models/revision';
import correctBody from '../dummyData/dummyRevisionCorrectBody';
process.env.NODE_ENV = 'test';
import app, { server } from '../../src/server';
const mongoUri: string = MONGODB_URI;
chai.use(chaiHttp);

describe(`PUT on path /revision/add`, () => {
	before(async () => {
		return mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	beforeEach(async () => {
		return Revision.deleteMany({});
	});
	after(async () => {
		await Revision.deleteMany({});
		server.close();
		return mongoose.connection.close();
	});

	describe(`with correct body`, () => {
		it(`should return saved revision object and status code 200`, (done) => {
			chai
				.request(app)
				.put('/revision/add')
				.set('content-type', 'application/json')
				.send(correctBody)
				.end((err, res) => {
					expect(res).have.status(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('_id');
					expect(res.body).to.have.property('modeId', correctBody.modeId);
					expect(res.body).to.have.property('code', correctBody.code);
					expect(res.body).to.have.property('version');
					expect(res.body).to.have.property('createdAt');
					expect(res.body).to.have.property('body');
					done();
				});
		});
	});
	describe(`with incorrect body`, () => {
		it(`should return object with error description and status code 400`, (done) => {
			chai.request(app).put('/revision/add').set('content-type', 'application/json').send({}).end((err, res) => {
				expect(res).have.status(400);
				expect(res.body.error).to.be.an('object');
				expect(res.body.error).to.have.property('message', 'Wrong params in body');
				expect(res.body.error).to.have.property('status', 400);
				done();
			});
		});
	});
});
