import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import { MONGODB_URI } from '../../src/util/secrets';
import chaiHttp from 'chai-http';
import * as _ from 'lodash';
import Mode from '../../src/models/mode';
import Revision from '../../src/models/revision';
process.env.NODE_ENV = 'test';
import app, { server } from '../../src/server';
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

const correctBody = {
	author: '5cf2a6fded450065969652b3',
	modeId: '5cf2a6fded450065969652b3',
	thumbnail: '/path/to/custom.img',
	tags: [ 'test1', 'test number 2', 'hey there' ],
	gallery: 'some.png',
	code: '123asd'
};

const incorrectBody = {
	author: '5cf2a6fded450065969652b3',
	modeId: '5cf2a6fded450065969652b3',
	thumbnail: '/path/to/custom.img',
	tags: [ 'test1', 'test number 2', 'hey there' ],
	gallery: 'some.png'
};
