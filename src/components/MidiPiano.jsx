import { Piano } from '@tonejs/piano';
import { useMidi } from '../inputs/midi';
import { useEffect, useState } from 'react';

function MidiPiano({ handlePiano }) {
	const [piano, setPiano] = useState(
		new Piano({
			velocities: 5
		})
	);
	const [pedalDown, setPedalDown] = useState(false);

	const midiInit = useMidi;

	useEffect(() => {
		midiInit(
			(note, velocity) => {
				piano.keyDown({ note, velocity });
				handlePiano.keyDown(note, velocity);
			},
			note => {
				piano.keyUp({ note });
				handlePiano.keyUp(note);
			},
			() => {
				setPedalDown(pedalDown => {
					!pedalDown ? piano.pedalDown() : piano.pedalUp();
					return !pedalDown;
				});
			}
		);
		piano.load().then(() => {
			console.log('loaded');
		});
		piano.toDestination();
	}, []);
}

export default MidiPiano;
