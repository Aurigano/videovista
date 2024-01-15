import { useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

function Room() {
	const socket = useSocket();

	const handleUserJoin = useCallback(
		(data: { email: string; id: string }) => {
			const { email, id } = data;
			console.log("joined room", { email, id });
		},
		[]
	);

	useEffect(() => {
		socket.on("user:joined", handleUserJoin);
		return () => {
			socket.off("user:joined", handleUserJoin);
		};
	}, [socket, handleUserJoin]);

	return <div>Room</div>;
}

export default Room;
