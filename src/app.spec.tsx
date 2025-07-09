import { cleanup, render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  afterEach(cleanup);

  const makeSut = () => {
    const sut = render(<App />);

    return { sut };
  };

  it('renders correctly', () => {
    const { sut } = makeSut();

    expect(sut.container).toBeInTheDocument();
  });
});
