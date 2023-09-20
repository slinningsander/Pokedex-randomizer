import { render, screen } from '@testing-library/react';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import catadoze from '/src/assets/catadoze.jpg';

describe('PokemonCard-test', () => {
  let mockSetRefresh: (refresh: boolean) => void;
  let mockRefresh: boolean;
  beforeEach(() => {
    //mock localstorage
    const mockLocalStorage = {
      getItem: vi.fn().mockReturnValue('[]'),
      setItem: vi.fn(),
      clear: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });
  mockRefresh = false;
  // eslint-disable-next-line prefer-const
  mockSetRefresh = vi.fn((newRefresh) => {
    mockRefresh = newRefresh;
  });
  const pokemonCard = (
    <PokemonCard name="Picachu" type="Electric" imgURL={catadoze} setRefresh={mockSetRefresh} refresh={mockRefresh} />
  );
  it('Should find props', () => {
    render(pokemonCard);
    expect(screen.getByText('Picachu')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/project1/src/assets/catadoze.jpg');
  });
  it('has focus (button)', () => {
    render(pokemonCard);
    const button = screen.getByTestId('test-detailsBtn');
    button.focus();
    expect(button).toHaveFocus();
  });
  it('PokemonCard snapshot', () => {
    const result = render(pokemonCard);
    expect(result).toMatchSnapshot();
  });
});
