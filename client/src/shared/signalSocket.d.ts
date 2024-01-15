/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace SignalSocket {
	interface EmitEvents {
		"room:join": (email: string, room: string) => void;
	}
	interface ListenEvents {}
}

interface ServerToClientEvents {
	noArg: () => void;
	basicEmit: (a: number, b: string, c: Buffer) => void;
	withAck: (d: string, callback: (e: number) => void) => void;
	"room:join": (data: { email: string; room: string }) => void;
	"user:joined": (data: { email: string; id: string }) => void;
}
interface ClientToServerEvents {
	hello: () => void;
	"room:join": (data: { email: string; room: string }) => void;
}

interface InterServerEvents {
	ping: () => void;
}

interface SocketData {
	name: string;
	age: number;
}
