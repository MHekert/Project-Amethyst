export default interface ISession {
	expires: string;
	session: {
		cookie: {
			originalMaxAge: string;
			expires: string;
			secure: boolean;
			httpOnly: boolean;
			path: string;
			domain: string;
			sameSite: string;
		};
		passport: {
			user: string;
		};
	};
}
