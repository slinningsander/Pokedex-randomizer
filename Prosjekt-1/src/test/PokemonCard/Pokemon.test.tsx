import { render, screen } from '@testing-library/react';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import catadoze from '/src/assets/catadoze.jpg';

describe('PokemonCard-test', () => {
  const pokemonCard = <PokemonCard name="Picachu" type="Electric" imgURL={catadoze} />;
  it('Should find props', () => {
    render(pokemonCard);
    expect(screen.getByText('Picachu')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/src/assets/catadoze.jpg');
  });
});
