import { sutMockProvider } from '@/__test__';
import { cleanup } from '@testing-library/react';
import { NotFoundPage } from './not-found';

describe('NotFoundPage', () => {
  afterEach(cleanup);

  const makeSut = () => {
    const sut = sutMockProvider(<NotFoundPage />);

    return {
      sut,
    };
  };

  it('should render correctly', () => {
    const { sut } = makeSut();

    expect(sut.container).toBeInTheDocument();
  });

  it('shoudl match snapshot', () => {
    const { sut } = makeSut();

    expect(sut.container).toMatchSnapshot();
  });
});
