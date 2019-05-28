import { Server } from 'net';

export class Connections {
	connections: any;
	server: Server;
	constructor(serv: Server) {
		this.connections = {};
		this.server = serv;
	}
	enableDestroy = () => {
		// const connections: any = {};
		console.log('enable');
		this.server.on('connection', (conn: any) => {
			console.log('hey');
			const key = conn.remoteAddress + ':' + conn.remotePort;
			this.connections[key] = conn;
			conn.on('close', () => {
				console.log('DELETE');
				delete this.connections[key];
			});
		});
	};

	destroy = (cb: any) => {
		console.log('destoy');
		this.server.close(cb);
		for (const key in this.connections) this.connections[key].destroy();
	};
}

// export const enableDestroy = (server: Server) => {
// 	const connections: any = {};

// 	server.on('connection', (conn: any) => {
// 		const key = conn.remoteAddress + ':' + conn.remotePort;
// 		connections[key] = conn;
// 		conn.on('close', () => {
// 			delete connections[key];
// 		});
// 	});
// };

// export const destroy = (server: Server, cb: any) => {
//     server.close(cb);
//     for (const key in connections) connections[key].destroy();
// };
