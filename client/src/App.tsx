import { Route, Routes } from "react-router-dom";
import "./App.css";
import Lobby from "./view/Lobby";
import Room from "./view/Room";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Lobby />} />
				<Route path="/room/:roomId" element={<Room />} />
			</Routes>
		</div>
	);
}

export default App;
