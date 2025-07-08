import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  afterEach(cleanup);

  const makeSut = () => {
    const sut = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    return { sut };
  };

  it('renders correctly', () => {
    const { sut } = makeSut();

    expect(sut.container).toBeInTheDocument();
  });
});
