import { ALL_NOTES, NOTE_LETTERS } from '../constants';
import { Chord, ChordType, note, Note, Scale } from '@tonaljs/tonal';
import { parseNote, parseNotation, randomIndex } from '../helpers';
import Keyboard from '../components/Keyboard';
import Staff from '../components/Staff';
import styled from 'styled-components';
import MidiPiano from '../components/MidiPiano';
import { useState, useEffect } from 'react';
import {
	start as toneStart,
	Oscillator,
	Transport,
	immediate,
	Time
} from 'tone';
import Start from '../components/Start';

const LeadSheetStyles = styled.div`
	height: 100vh;
	.keyboard {
		position: absolute;
		bottom: 0;
		height: 35%;
	}
`;

function LeadSheet() {
	const testLength = 16;
	const [started, setStarted] = useState(false);
	const [activeNotes, setActiveNotes] = useState([]);
	const [randomChords, setRandomChords] = useState(genRandomChords(testLength));
	const [staffProps, setStaffProps] = useState({
		currentMeasure: 0,
		results: []
	});

	const description = 'lead sheet';
	const noteSort = (a, b) => Note.midi(a) - Note.midi(b);
	const removeCapM = chord => chord.split('M').join('');

	useEffect(() => {
		const osc = new Oscillator().toDestination();

		Transport.bpm.value = 120;
		Transport.setLoopPoints('1m', '16m');
		Transport.loop = true;
		Transport.scheduleRepeat(time => {
			const measure = Number(Transport.position.split(':')[0]);
			setStaffProps(staffProps => ({ ...staffProps, currentMeasure: measure }));
		}, '1n');
		Transport.scheduleRepeat(time => {
			osc.start(time).stop(time + 0.1);
		}, '4n');
	}, []);
	const onStart = () => {
		toneStart();
		setStarted(started => true);
		Transport.start();
	};

	const handlePiano = {
		keyDown: (note, velocity) => {
			const timeContext = Transport.position;

			setActiveNotes(activeNotes => {
				const newActiveNotes = [...activeNotes, note];
				handleCheck(newActiveNotes, timeContext);
				return newActiveNotes;
			});
		},
		keyUp: note => {
			setActiveNotes(activeNotes => [...activeNotes.filter(n => n !== note)]);
		}
	};

	const handleCheck = (notes, timeStr) => {
		const time = parseNotation(timeStr);
		const correctChord = randomChords[time.bar - 1];
		const isCorrectBeat = time.beat === 0;
		const possibleChordsPlayed = Chord.detect(notes.sort(noteSort)).flatMap(
			chord => {
				const chordObj = Chord.get(chord);
				return chordObj.aliases.map(a => `${chordObj.tonic}${a}`);
			}
		);

		console.log(possibleChordsPlayed);
		if (!correctChord) return;
		const isCorrectChord = possibleChordsPlayed.includes(correctChord);

		if (isCorrectBeat && isCorrectChord) {
			setStaffProps(staffProps => ({
				...staffProps,
				results: { ...staffProps.results, [time.bar]: true }
			}));
		}

		// if()
	};
	const handleStaffUpdate = (staff, { currentMeasure, results }) => {
		const activeStaff = document.getElementById(`vf-chord-${currentMeasure}`);
		const prevActive = staff.querySelector('.active');

		if (prevActive) prevActive.classList.remove('active');
		if (activeStaff) activeStaff.classList.add('active');
		Object.keys(results).forEach(bar => {
			const barElem = document.getElementById(`vf-chord-${bar}`);
			barElem.classList.add(results[bar] ? 'correct' : 'incorrect');
		});
	};
	return (
		<LeadSheetStyles>
			{Chord.detect(activeNotes.sort(noteSort))
				.map(removeCapM)
				.flatMap(chord => [chord, Chord.reduced(chord)])
				.join(',')}
			<Staff
				numOfStaves={testLength}
				randomChords={randomChords}
				handleStaffUpdate={handleStaffUpdate}
				staffProps={staffProps}
			/>
			<Keyboard activeNotes={activeNotes} />
			<MidiPiano handlePiano={handlePiano} />
			{!started && <Start onStart={onStart} description={description} />}
		</LeadSheetStyles>
	);
}

export default LeadSheet;

function genRandomChords(numOfChords = 1) {
	/* const scale = Scale('')
	const moveNaturalNote = (note, moveBy) =>
	NOTE_LETTERS[
		(NOTE_LETTERS.indexOf(note) + (moveBy + NOTE_LETTERS.length)) %
			NOTE_LETTERS.length
	]; */
	/* 	console.log(
		ChordType.all()
			.filter(chord => chord.name)
			.filter(chord => chord.intervals.length === 3)
			.map(c => c.name)
	); */
	const qualities = ChordType.all()
		.filter(chord => chord.name)
		.filter(chord => chord.intervals.length === 3)
		.map(({ aliases }) => aliases[randomIndex(aliases)]);

	// .map(chord => `${chord.name}: ${chord.aliases}`)

	return Array.from(Array(numOfChords)).map(
		() =>
			`${ALL_NOTES[randomIndex(ALL_NOTES)]}${qualities[randomIndex(qualities)]}`
	);
}
/* 
TODO

Nail down game loop
	Loop?
	Ramp up?
More Chords
Instructions
Reload/reset issues
More Style
Info
Start/Stop
Metronome
Scoring


*/
