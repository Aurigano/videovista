import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

type socketDataType = { email: string; room: string };

function Lobby() {
	const [email, setEmail] = useState("");
	const [room, setRoom] = useState("");

	const socket = useSocket();
	const navigate = useNavigate();

	const handleSubmitForm = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			socket.emit("room:join", { email, room });
		},
		[email, room, socket]
	);

	const handleJoinRoom = useCallback(
		(data: socketDataType) => {
			const { email, room } = data;
			console.log(email, room);
			navigate(`/room/${room}`);
		},
		[navigate]
	);

	useEffect(() => {
		socket.on("room:join", handleJoinRoom);
		return () => {
			socket.off("room:join", handleJoinRoom);
		};
	}, [handleJoinRoom, socket]);

	return (
		<div className="flex flex-col items-center gap-10">
			<h1>Lobby</h1>
			<form
				className="flex flex-col max-w-80 gap-4"
				onSubmit={(e) => handleSubmitForm(e)}
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-start">
						Email ID
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="room" className="text-start">
						Room Number
					</label>
					<input
						type="text"
						id="room"
						value={room}
						onChange={(e) => setRoom(e.target.value)}
					/>
				</div>
				<div>
					<button
						type="submit"
						className="mt-4 py-2 px-6 bg-gray-300"
					>
						Join
					</button>
				</div>
			</form>
		</div>
	);
}

export default Lobby;
