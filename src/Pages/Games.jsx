import { useParams } from 'react-router-dom';
import LeadSheet from './LeadSheet';

function Games() {
	const { game } = useParams();
	const Games = { leadsheet: LeadSheet };
	const SelectedGame = Games[game];

	return (
		<div>
			<SelectedGame />
		</div>
	);
}

export default Games;

/* TODO
Outline desired result

App
  Menu


State
  Staff
  time
  play
  score
  userInput
  
API
  Midi note obj
  GameModes
    createGameLoop( while(), )


Components
  Time Display
  Staff Display
  Input
    Midi
  Synth
  score display
  grader

Functions
  getNoteRhythm(time)
  createMidiObj


sight reading


*/
