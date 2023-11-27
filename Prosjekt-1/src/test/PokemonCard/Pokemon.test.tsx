import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import catadoze from '/src/assets/catadoze.jpg';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as object), // Wrap actual inside an object
    useNavigate: () => vi.fn(), // Mock useNavigate
  };
});

describe('PokemonCard-test', () => {
  beforeEach(() => {
    // mock localstorage
    const mockLocalStorage = {
      getItem: vi.fn().mockReturnValue('[]'),
      setItem: vi.fn(),
      clear: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });
  let mockRefresh = false;
  const mockSetRefresh = vi.fn((newRefresh) => {
    mockRefresh = newRefresh;
  });
  const pokemonCard = (
    <MemoryRouter>
      {' '}
      {/* Wrap your component in MemoryRouter */}
      <PokemonCard name="Pikachu" type="Electric" imgURL={catadoze} setRefresh={mockSetRefresh} refresh={mockRefresh} />
    </MemoryRouter>
  );

  it('Should find props', () => {
    render(pokemonCard);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
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
    const { asFragment } = render(pokemonCard);
    expect(asFragment()).toMatchSnapshot();
  });
});
