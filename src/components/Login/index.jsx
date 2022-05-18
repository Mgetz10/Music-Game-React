import { useState } from 'react';
import { handleInputChange, slugger } from '../../helpers';

function Login({ setIsLoggedIn, setGameModes }) {
	const [inputs, setInputs] = useState({});

	const login = credentials => {
		let success = true;
		let userData = {};

		console.log(credentials);

		if (success) return { success, userData };
		else return { success, userData };
	};
	const handleSubmit = e => {
		e.preventDefault();

		const { success } = login(inputs);
		setIsLoggedIn(isLoggedIn => success);

		setInputs(() => ({}));
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				{['Username', 'Password'].map((input, i) => (
					<div className="form-item" key={i}>
						<label htmlFor={slugger(input)}>{input}:</label>
						<input
							required
							type={input === 'Password' ? 'password' : 'text'}
							name={input}
							id={slugger(input)}
							value={inputs[input] || ''}
							onChange={e => handleInputChange(e, setInputs)}
						/>
					</div>
				))}
			</div>
			<button type="submit">Login</button>
		</form>
	);
}

export default Login;
