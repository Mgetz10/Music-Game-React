import styled from 'styled-components';

import {
	Stave,
	StaveNote,
	Beam,
	Formatter,
	Renderer,
	Voice,
	ChordSymbol,
	SymbolModifiers
} from 'vexflow';
import { useRef, useEffect } from 'react';

const StaffStyles = styled.div`
	width: 80%;
	margin: 0 auto 0;
	padding-top: 2rem;
	height: 61%;
	overflow-y: auto;
	svg {
		margin: 0 auto;
		width: 100% !important;
		[id*='vf-chord'] {
			g.vf-modifiers {
				path,
				text {
					fill: black;
				}
			}
			&.active {
				g.vf-modifiers {
					path,
					text {
						fill: blue;
					}
				}
			}
			&.correct {
				g.vf-modifiers {
					path,
					text {
						fill: green;
					}
				}
			}
			&.incorrect {
				g.vf-modifiers {
					path,
					text {
						fill: red;
					}
				}
			}
		}
	}
`;
function Staff({
	numOfStaves = 16,
	randomChords,
	handleStaffUpdate,
	staffProps
}) {
	const staffContainer = useRef();
	useEffect(() => {
		staffContainer.current.innerHTML = ' ';
		console.log(randomChords);
		/* 	const {
			Renderer,
			Stave,
			StaveNote,
			Voice,
			Formatter,
			ChordSymbol,
			SymbolModifiers
		} = Vex.Flow;

		const renderer = new Renderer(
			staffContainer.current,
			Renderer.Backends.SVG
		);

		renderer.resize(500, 500);
		const context = renderer.getContext();

		// Create a stave of width 400 at position 10, 40 on the canvas.
		const stave = new Stave(10, 40, 200);

		// Add a clef and time signature.
		stave.addClef('treble').addTimeSignature('4/4');

		// Connect it to the rendering context and draw!
		stave.setContext(context).draw();

		const notes = [
			// A quarter-note C.
			new StaveNote({ keys: ['c/5'], duration: 'q' }),

			// A quarter-note D.
			new StaveNote({ keys: ['d/4'], duration: 'q' }),

			// A quarter-note rest. Note that the key (b/4) specifies the vertical
			// position of the rest.
			new StaveNote({ keys: ['b/4'], duration: 'qr' }),

			// A C-Major chord.
			new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' })
		];

		const chord = new ChordSymbol().addText('F7').addGlyphOrText('(#11b9)', {
			symbolModifier: SymbolModifiers.SUPERSCRIPT
		});

		notes[0].addModifier(chord);
		// notes[0].setStyle({ fillStyle: 'transparent' });
		// notes[0].setStemStyle({ strokeStyle: 'transparent' });
		// Create a voice in 4/4 and add above notes
		const voice = new Voice({ num_beats: 4, beat_value: 4 });
		voice.addTickables(notes);

		// Format and justify the notes to 400 pixels.
		new Formatter().joinVoices([voice]).format([voice], 10);

		// Render voice
		voice.draw(context, stave);

		 */
		// This approach to importing classes works in CJS contexts (i.e., a regular <script src="..."> tag).

		// Create an SVG renderer and attach it to the DIV element with id="output".
		/* 
=============================================================================================
=============================================================================================

		const renderer = new Renderer(
			staffContainer.current,
			Renderer.Backends.SVG
		);

		// Configure the rendering context.
		renderer.resize(720, 130);
		const context = renderer.getContext();

		// Measure 1
		const staveMeasure1 = new Stave(10, 0, 300);
		staveMeasure1.addClef('treble').setContext(context).draw();

		const chord = new ChordSymbol().addText('F7').addGlyphOrText('(#11b9)', {
			symbolModifier: SymbolModifiers.SUPERSCRIPT
		});

		const notesMeasure1 = [
			new StaveNote({ keys: ['c/5'], duration: 'q' })
				.addModifier(chord)
				.setStyle({ fillStyle: 'transparent' })
				.setStemStyle({ strokeStyle: 'transparent' }),
			new StaveNote({ keys: ['d/4'], duration: 'q' }),
			new StaveNote({ keys: ['b/4'], duration: 'qr' }),
			new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' })
		];
		staveMeasure1.setContext(context).draw();

		// Helper function to justify and draw a 4/4 voice
		Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

		// Measure 2 - second measure is placed adjacent to first measure.
		const staveMeasure2 = new Stave(
			staveMeasure1.width + staveMeasure1.x,
			0,
			400
		);

		const notesMeasure2_part1 = [
			new StaveNote({ keys: ['c/4'], duration: '8' }),
			new StaveNote({ keys: ['d/4'], duration: '8' }),
			new StaveNote({ keys: ['b/4'], duration: '8' }),
			new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: '8' })
		];

		const notesMeasure2_part2 = [
			new StaveNote({ keys: ['c/4'], duration: '8' }),
			new StaveNote({ keys: ['d/4'], duration: '8' }),
			new StaveNote({ keys: ['b/4'], duration: '8' }),
			new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: '8' })
		];

		// Create the beams for 8th notes in second measure.
		const beam1 = new Beam(notesMeasure2_part1);
		const beam2 = new Beam(notesMeasure2_part2);

		const notesMeasure2 = notesMeasure2_part1.concat(notesMeasure2_part2);

		staveMeasure2.setContext(context).draw();
		Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);

		// Render beams
		beam1.setContext(context).draw();
		beam2.setContext(context).draw(); */

		const renderer = new Renderer(
			staffContainer.current,
			Renderer.Backends.SVG
		);

		// Configure the rendering context.
		renderer.resize(630, 490);
		const context = renderer.getContext();

		const generatedStaves = [];
		const stavesPerRow = 4;
		const rowHeight = 110;
		let currentRow = 0;

		for (let staffNum = 1; !(staffNum > numOfStaves); staffNum++) {
			const prevStaff = generatedStaves[staffNum - 2];
			const newRow = staffNum > 1 && staffNum % stavesPerRow === 1;
			const xPos = newRow || !prevStaff ? 10 : prevStaff.width + prevStaff.x;

			if (newRow) currentRow += rowHeight;

			const staffMeasurements = [xPos, currentRow, 150];
			const staff = new Stave(...staffMeasurements);

			if (!prevStaff)
				staff.addClef('treble').setContext(context).addTimeSignature('4/4');

			const chord = new ChordSymbol().addText(randomChords[staffNum - 1]);
			/* .addGlyphOrText('(#11b9)', {
					symbolModifier: SymbolModifiers.SUPERSCRIPT
				}); */

			const notes = [
				new StaveNote({ keys: ['c/5'], duration: 'q' })
					.addModifier(chord)
					.setStyle({ fillStyle: 'transparent' })
					.setStemStyle({ strokeStyle: 'transparent' })
					.setAttribute('id', `chord-${staffNum}`)
					.setAttribute('class', 'chord')
			];
			generatedStaves.push(staff);

			staff.setContext(context).draw();
			Formatter.FormatAndDraw(context, staff, notes);
		}

		// staveMeasure2.setContext(context).draw();

		// Render beams
	}, []);
	useEffect(() => {
		handleStaffUpdate(staffContainer.current, staffProps);
	}, [staffProps]);
	// staffContainer.appendChild(svgContainer);
	return (
		<StaffStyles>
			<div ref={staffContainer}></div>
		</StaffStyles>
	);
}
export default Staff;
