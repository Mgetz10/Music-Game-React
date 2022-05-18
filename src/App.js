import './App.scss';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Games from './Pages/Games';
import GamesMenu from './Pages/GamesMenu';
import ErrorPage from './Pages/ErrorPage';

function App() {
	return (
		<div className="App">
			<Router>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/games">Games</Link>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/games" element={<GamesMenu />} />
					<Route path="/games/:game" element={<Games />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
