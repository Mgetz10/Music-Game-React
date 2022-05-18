import { KEYBOARDS } from '../constants';
import { createNotes } from '../helpers';
import styled from 'styled-components';

// const whiteKeyWidth = 11.1;
// const blackKeyWidth = whiteKeyWidth / 2;
// const negativeMargin = blackKeyWidth / -2;
const playingColor = 'lightgreen';
const whiteKeyColor = 'rgb(255,255,255)';
const whiteKeyBorderColor = '#c7c7c7';
const blackKeyColor = 'rgb(48, 48, 48)';
const blackKeyBorderColor = 'rgb(0,0,0)';
const blackKeyBorderColorPlaying = playingColor;

const KeyboardStyles = styled.div`
	--white-key-width: ${({ full }) => (full ? 100 / (7 * 7 + 3) : 11.1)}%;
	--black-key-width: calc(var(--white-key-width) / 2);
	--negative-margin: calc(var(--black-key-width) / -2);
	--black-key-border: 0rem;

	height: 10rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	.keys {
		height: 80%;
		width: 100%;
		display: flex;

		.key {
			border-color: gray;
			box-sizing: border-box;
			flex: 0 0 auto;
			margin: 0;
			padding: 0;
			border: none;
			-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
			-webkit-touch-callout: none;
			user-select: none;

			&:first-child {
				margin-left: 0 !important;
			}

			&.white {
				background: ${whiteKeyColor};
				box-sizing: border-box;
				border-width: 0 0.1rem 0.3rem;
				border-style: none solid solid;
				width: var(--white-key-width);
				margin-left: var(--negative-margin);
				height: 99%;
				border-color: ${whiteKeyBorderColor};

				&.playing {
					background-color: ${playingColor};
					margin-top: 0.1rem;
					border-width: 0 0.105rem 0.05rem;
				}

				&:focus {
					z-index: 1;
				}

				&[class*='c'],
				&[class*='f'] {
					margin-left: 0;
				}
			}

			&.black {
				background: ${blackKeyColor};
				height: 58%;
				width: var(--black-key-width);
				z-index: 2;
				margin-left: var(--negative-margin);
				border-width: 0 var(--black-key-border) 0.5rem;
				border-style: none solid solid;
				border-color: ${blackKeyBorderColor};

				&.playing {
					background-color: ${playingColor};
					border-color: ${blackKeyBorderColorPlaying};
					border-width: 0 var(--black-key-border) 0.3rem;
				}
			}
		}
	}
`;

// Tone.context.lookAhead = 0;

function Keyboard({ activeNotes }) {
	return (
		<KeyboardStyles className="keyboard" full>
			<div className="keys">
				{createNotes(KEYBOARDS[88]).map((note, i) => (
					<button
						key={i}
						className={`${
							activeNotes.includes(note) ? 'playing' : ''
						} ${note} ${note.length === 3 ? 'black' : 'white'} key`}
					></button>
				))}
			</div>
		</KeyboardStyles>
	);
}
export default Keyboard;
