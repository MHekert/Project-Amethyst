process.env.NODE_ENV = 'test';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import { MONGODB_URI } from '../../src/util/secrets';
import chaiHttp from 'chai-http';
import * as _ from 'lodash';
import app, { server } from '../../src/server';
const mongoUri: string = MONGODB_URI;
chai.use(chaiHttp);

describe(`GET on path`, () => {
	before(async () => {
		return mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	after(async () => {
		server.close();
		return mongoose.connection.close();
	});

	describe(`/modes/new`, () => {
		describe(`/:quantity with number in quantity's place`, () => {
			it(`should return array and status code 200`, (done) => {
				chai.request(app).get('/modes/new/10').end((err, res) => {
					expect(res).have.status(200);
					expect(_.isArray(res.body)).to.equal(true);
					done();
				});
			});
		});
		describe(`/:quantity with sting quantity's place`, () => {
			it(`should return message and status code 400`, (done) => {
				chai.request(app).get('/modes/new/wrong_param').end((err, res) => {
					expect(res).have.status(400);
					expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with correct params`, () => {
			it(`should return array and status code 200`, (done) => {
				chai.request(app).get('/modes/new/10/2019-05-28T16:55:56.496Z/1000').end((err, res) => {
					expect(res).have.status(200);
					expect(_.isArray(res.body)).to.equal(true);
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with wrong quantity param`, () => {
			it(`should return message and status code 400`, (done) => {
				chai.request(app).get('/modes/new/wrong_param/2019-05-28T16:55:56.496Z/1000').end((err, res) => {
					expect(res).have.status(400);
					expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with wrong date param`, () => {
			it(`should return message and status code 400`, (done) => {
				chai.request(app).get('/modes/new/10/2019-05-2/1000').end((err, res) => {
					expect(res).have.status(400);
					expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with wrong date param`, () => {
			it(`should return message and status code 400`, (done) => {
				chai.request(app).get('/modes/new/10/2019-05-28T16:55:56.496Z/wrong_param').end((err, res) => {
					expect(res).have.status(400);
					expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with wrong params number`, () => {
			it(`should return message and status code 404`, (done) => {
				chai.request(app).get('/modes/new/10/2019-05-28T16:55:56.496Z').end((err, res) => {
					expect(res).have.status(404);
					done();
				});
			});
		});
	});
	describe(`/modes/top`, () => {
		describe(`/:quantity with number in quantity's place`, () => {
			it(`should return array and status code 200`, (done) => {
				chai.request(app).get('/modes/top/10').end((err, res) => {
					expect(res).have.status(200);
					expect(_.isArray(res.body)).to.equal(true);
					done();
				});
			});
		});
		describe(`/:quantity with sting quantity's place`, () => {
			it(`should return message and status code 400`, (done) => {
				chai.request(app).get('/modes/top/wrong_param').end((err, res) => {
					expect(res).have.status(400);
					expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with correct params`, () => {
			it(`should return array and status code 200`, (done) => {
				chai.request(app).get('/modes/top/10/2019-05-28T16:55:56.496Z/1000').end((err, res) => {
					expect(res).have.status(200);
					expect(_.isArray(res.body)).to.equal(true);
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with wrong quantity param`, () => {
			it(`should return message and status code 400`, (done) => {
				chai.request(app).get('/modes/top/wrong_param/2019-05-28T16:55:56.496Z/1000').end((err, res) => {
					expect(res).have.status(400);
					expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with wrong date param`, () => {
			it(`should return message and status code 400`, (done) => {
				chai.request(app).get('/modes/top/10/2019-05-2/1000').end((err, res) => {
					expect(res).have.status(400);
					expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with wrong date param`, () => {
			it(`should return message and status code 400`, (done) => {
				chai.request(app).get('/modes/top/10/2019-05-28T16:55:56.496Z/wrong_param').end((err, res) => {
					expect(res).have.status(400);
					expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
					done();
				});
			});
		});
		describe(`/:quantity/:date/:points with wrong params number`, () => {
			it(`should return message and status code 404`, (done) => {
				chai.request(app).get('/modes/top/10/2019-05-28T16:55:56.496Z').end((err, res) => {
					expect(res).have.status(404);
					done();
				});
			});
		});
	});
});
