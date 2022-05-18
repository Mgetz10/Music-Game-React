const NOTES = {
	a: { hasSharp: true, hasFlat: true },
	b: { hasSharp: false, hasFlat: true },
	c: { hasSharp: true, hasFlat: false },
	d: { hasSharp: true, hasFlat: true },
	e: { hasSharp: false, hasFlat: true },
	f: { hasSharp: true, hasFlat: false },
	g: { hasSharp: true, hasFlat: true }
};
const NOTE_LETTERS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const ALL_NOTES = [
	'C',
	'D',
	'E',
	'F',
	'G',
	'A',
	'B',
	'C#',
	'D#',
	'F#',
	'G#',
	'A#',
	'Db',
	'Eb',
	'Gb',
	'Ab',
	'Bb'
];
const CIRCLE_OF_FIFTHS = [
	'C',
	'D',
	'E',
	'F',
	'G',
	'A',
	'B',
	'C#',
	'F#',
	'Db',
	'Eb',
	'Gb',
	'Ab',
	'Bb'
];
const QUALITIES = {
	TRIADS_1: ['', 'm'],
	TRIADS_2: ['dim', 'aug'],
	TRIADS_3: ['sus2', 'sus4'],
	SEVENTHS_1: ['7', 'maj7', 'o7']
};
const OCTAVES = 8;
const NOTES_PER_OCTAVE = 12;

const KEYBOARDS = {
	49: { lowestNote: 'c2', highestNote: 'c6' },
	61: { lowestNote: 'c2', highestNote: 'c7' },
	76: { lowestNote: 'e1', highestNote: 'g7' },
	88: { lowestNote: 'a0', highestNote: 'c8' }
};

export {
	NOTES,
	NOTE_LETTERS,
	OCTAVES,
	NOTES_PER_OCTAVE,
	KEYBOARDS,
	CIRCLE_OF_FIFTHS,
	QUALITIES,
	ALL_NOTES
};
