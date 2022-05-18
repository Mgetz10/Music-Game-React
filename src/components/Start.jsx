import styled from 'styled-components';

const StartStyles = styled.div`
	position: absolute;
	background: white;
	padding: 2rem;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 0.1rem solid black;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
	z-index: 2;
`;
function Start({ onStart, description }) {
	return (
		<StartStyles>
			<p>{description}</p>
			<button onClick={onStart}>Start</button>
		</StartStyles>
	);
}

export default Start;
