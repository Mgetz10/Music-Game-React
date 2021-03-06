const midiLookup = {
	21: 'a0',
	22: 'a#0',
	23: 'b0',
	24: 'c1',
	25: 'c#1',
	26: 'd1',
	27: 'd#1',
	28: 'e1',
	29: 'f1',
	30: 'f#1',
	31: 'g1',
	32: 'g#1',
	33: 'a1',
	34: 'a#1',
	35: 'b1',
	36: 'c2',
	37: 'c#2',
	38: 'd2',
	39: 'd#2',
	40: 'e2',
	41: 'f2',
	42: 'f#2',
	43: 'g2',
	44: 'g#2',
	45: 'a2',
	46: 'a#2',
	47: 'b2',
	48: 'c3',
	49: 'c#3',
	50: 'd3',
	51: 'd#3',
	52: 'e3',
	53: 'f3',
	54: 'f#3',
	55: 'g3',
	56: 'g#3',
	57: 'a3',
	58: 'a#3',
	59: 'b3',
	60: 'c4',
	61: 'c#4',
	62: 'd4',
	63: 'd#4',
	64: 'e4',
	65: 'f4',
	66: 'f#4',
	67: 'g4',
	68: 'g#4',
	69: 'a4',
	70: 'a#4',
	71: 'b4',
	72: 'c5',
	73: 'c#5',
	74: 'd5',
	75: 'd#5',
	76: 'e5',
	77: 'f5',
	78: 'f#5',
	79: 'g5',
	80: 'g#5',
	81: 'a5',
	82: 'a#5',
	83: 'b5',
	84: 'c6',
	85: 'c#6',
	86: 'd6',
	87: 'd#6',
	88: 'e6',
	89: 'f6',
	90: 'f#6',
	91: 'g6',
	92: 'g#6',
	93: 'a6',
	94: 'a#6',
	95: 'b6',
	96: 'c7',
	97: 'c#7',
	98: 'd7',
	99: 'd#7',
	100: 'e7',
	101: 'f7',
	102: 'f#7',
	103: 'g7',
	104: 'g#7',
	105: 'a7',
	106: 'a#7',
	107: 'b7',
	108: 'c8',
	109: 'd8',
	110: 'd#8',
	111: 'e8',
	112: 'f8',
	113: 'f#8',
	114: 'g8',
	115: 'g#8',
	116: 'a8',
	117: 'a#8',
	118: 'b8',
	119: 'c9',
	120: 'c#9',
	121: 'd9',
	122: 'd#9',
	123: 'e9',
	124: 'f9',
	125: 'f#9',
	126: 'g9',
	127: 'g#9'
};

// const padCommands = {
// 	40: startMetronome,
// 	41: stopMetronome
// };

function useMidi(noteOn, noteOff, pedal) {
	navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
	function onMIDISuccess(midiAccess) {
		midiAccess.addEventListener('statechange', updateDevices);

		const inputs = midiAccess.inputs;

		inputs.forEach(input =>
			input.addEventListener('midimessage', handleMIDIInput)
		);
	}
	function handleMIDIInput(input) {
		const command = input.data[0];
		const note = input.data[1];
		const velocity = input.data[2];

		switch (command) {
			case 144: //note on
				if (velocity > 0) noteOn(midiLookup[note], velocity / 127);
				else noteOff(note);
				break;
			case 128: //note off
				noteOff(midiLookup[note]);
				break;
			case 176: //pedal up/down
				pedal();
				break;
			default:
				break;
		}
		// const messageType = parseMIDIType(input);
		// if (!messageType) return;

		// if (messageType === 'note on' || messageType === 'note off') {
		// 	const note = parseMIDINote(input);
		// 	if (messageType === 'note on') noteOn(note);
		// 	else if (messageType === 'note off') noteOff(note);
		// } else if (messageType === 'pad') {
		// 	// padCommands[`${midiMessage.data[1]}`]();
		// }
	}
	// function noteOn(note, velocity) {
	// 	console.log(note, velocity);
	// }
	// function noteOff(note) {
	// 	console.log(note);
	// }

	function updateDevices(e) {
		// console.log(e);
	}

	function onMIDIFailure() {
		console.log('Could not access your MIDI devices.');
	}
}

export { useMidi };
