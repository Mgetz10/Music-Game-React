import { useNavigate } from 'react-router-dom';

function GamesMenu() {
	/*
		State 
			gameModes	
	*/
	const navigate = useNavigate();

	return (
		<div className="games-menu">
			<button onClick={() => navigate('/games/leadsheet')}>Lead Sheet</button>
		</div>
	);
}

export default GamesMenu;
