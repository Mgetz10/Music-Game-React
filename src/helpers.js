import { NOTES, NOTE_LETTERS } from './constants';
//General

const slugger = stringToSlug => stringToSlug.toLowerCase().split(' ').join('-');

function handleInputChange(e, setInputState) {
	const { name, value } = e.target;

	setInputState(prevInputs => {
		if (Array.isArray(prevInputs)) return [...prevInputs, value];
		else if (typeof prevInputs === 'object')
			return { ...prevInputs, [name]: value };
		else if (typeof prevInputs === 'string') return value;
	});
}

const isNumber = char => /^\d$/.test(char);

const randomIndex = arr => Math.floor(Math.random() * arr.length);

//System

//Music
const parseNote = note => {
	const noteArr = Array.from(note.toLowerCase());
	const hasOctave = isNumber(note[note.length - 1]);
	const octave = hasOctave && Number(noteArr.pop());
	const letter = noteArr.shift();
	const flatSharp = noteArr.length && noteArr.join('');

	return { letter, flatSharp, octave };
};

const createNotes = ({
	lowestNote = 'a0',
	highestNote = 'c8',
	isFlat,
	noFlatsSharps
}) => {
	const flatSharp = isFlat ? 'b' : '#';
	const correctContext = note =>
		parseNote(note).flatSharp === flatSharp ? note : alternateNoteName(note);
	const firstNote = parseNote(correctContext(lowestNote));
	const lastNote = parseNote(correctContext(highestNote));

	const createdNotes = [];

	for (let octave = firstNote.octave; !(octave > lastNote.octave); octave++) {
		const firstOctave = octave === firstNote.octave;
		const lastOctave = octave === lastNote.octave;
		const noteLetters = [];
		const fullOctave = [];

		if (firstOctave) {
			const removeBefore = NOTE_LETTERS.indexOf(firstNote.letter);
			noteLetters.push(...NOTE_LETTERS.slice(removeBefore));
		} else if (lastOctave) {
			const removeAfter = NOTE_LETTERS.indexOf(lastNote.letter) + 1;
			noteLetters.push(...NOTE_LETTERS.slice(0, removeAfter));
		} else noteLetters.push(...NOTE_LETTERS);

		if (!noFlatsSharps) {
			fullOctave.push(...addFlatsSharps(noteLetters));

			if (firstOctave && firstNote.flatSharp) {
				if (firstNote.flatSharp === '#') fullOctave.shift();
				else fullOctave.unshift(`${firstNote.letter}${firstNote.flatSharp}`);
			} else if (lastOctave && lastNote.flatSharp) {
				if (lastNote.flatSharp === 'b') fullOctave.pop();
				else fullOctave.push(`${lastNote.letter}${lastNote.flatSharp}`);
			}
		} else fullOctave.push(...noteLetters);

		createdNotes.push(...fullOctave.map(note => note + octave));
	}

	return createdNotes;
};

const addFlatsSharps = (naturalNoteLetters, wantFlats, topAndTail = true) =>
	naturalNoteLetters.flatMap((note, i) => {
		const firstNote = !i;
		const lastNote = i === naturalNoteLetters.length - 1;

		if (wantFlats && NOTES[note].hasFlat && !(topAndTail && firstNote))
			return [`${note}b`, `${note}`];
		else if (!wantFlats && NOTES[note].hasSharp && !(topAndTail && lastNote))
			return [`${note}`, `${note}#`];
		else return `${note}`;
	});

const moveNaturalNote = (note, moveBy) =>
	NOTE_LETTERS[
		(NOTE_LETTERS.indexOf(note) + (moveBy + NOTE_LETTERS.length)) %
			NOTE_LETTERS.length
	];

const alternateNoteName = note => {
	const { letter, flatSharp, octave } = parseNote(note);

	if (!flatSharp) return note;

	if (flatSharp === '#') return `${moveNaturalNote(letter, 1)}b${octave}`;
	else return `${moveNaturalNote(letter, -1)}#${octave}`;
};
const parseNotation = notation => ({
	bar: Number(notation.split(':')[0]),
	beat: Number(notation.split(':')[1]),
	sixteenth: Number(notation.split(':')[2])
});
export {
	slugger,
	handleInputChange,
	createNotes,
	randomIndex,
	parseNotation,
	parseNote
};
