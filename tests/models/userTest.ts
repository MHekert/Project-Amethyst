import { describe, it } from 'mocha';
import { expect } from 'chai';
import User from '../../src/models/user';
import bcrypt from 'bcrypt';

describe(`user's model method`, () => {
	describe(`that returns visible name`, () => {
		it(`should return e-mail as visible name`, () => {
			const user = new User();
			user.account.local.email = 'megaman@capcom.com';
			const result = user.determineVisibleName(user.account);
			expect(result).to.be.equal('megaman@capcom.com');
		});
		it(`should return Facebook name as visible name`, () => {
			const user = new User();
			user.account.facebook.name = 'Mega Man';
			const result = user.determineVisibleName(user.account);
			expect(result).to.be.equal('Mega Man');
		});
		it(`should return 'username' string as visible name`, () => {
			const user = new User();
			const result = user.determineVisibleName(user.account);
			expect(result).to.be.equal('username');
		});
	});
	describe(`that generates hash`, () => {
		it(`should return valid hash`, () => {
			const user = new User();
			user.account.local.password = 'passfraze';
			const hash = user.generateHash();
			const result = bcrypt.compareSync(user.account.local.password, hash);
			expect(result).to.be.equal(true);
		});
	});
	describe('that validates user object pre save', () => {
		it('should return user with visibleName and hashed password', () => {
			const user = new User();
			user.account.local.password = 'passfraze';
			const result = user.preSaveValidation(user);
			expect(result).to
				.include({ visibleName: 'username' })
				.and.to.have.nested.property('account.local.password');
		});
	});
});
