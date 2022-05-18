import { render, screen } from '@testing-library/react';
import App from './App';

describe('Counter Testing', () => {
	test('render the title of counter', () => {
		render(<App />);
		const linkElement = screen.getByText(/learn react/i);
		expect(linkElement).toBeInTheDocument();
	});
});
