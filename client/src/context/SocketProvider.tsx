import { ReactNode, createContext, useMemo, useContext } from "react";
import { io, Socket } from "socket.io-client";

export type SocketEventType = Socket<
	ServerToClientEvents,
	ClientToServerEvents
>;

export interface ChatSocketCtxState {
	socket: SocketEventType;
}

export const useSocket = () => {
	const socket = useContext(SocketContext).socket;
	return socket;
};

const SocketContext = createContext<ChatSocketCtxState>(
	{} as ChatSocketCtxState
);

export const SocketProvider = (props: { children: ReactNode }) => {
	const socket: SocketEventType = useMemo(() => io("localhost:8000"), []);

	// TODO: use socketRef.current as socket context
	// const socketRef = useRef(io("localhost:8000"));

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{props.children}
		</SocketContext.Provider>
	);
};
