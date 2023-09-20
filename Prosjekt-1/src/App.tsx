import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homePage/homePage';
import PokemonScreenTemplate from './pages/pokemonScreenTemplate/pokemonScreenTemplate';
import FavoritePokemonsPage from './pages/favoritePokemonsPage/favoritePokemonsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/project1" element={<HomePage />} />
        <Route path="/project1/details/:pokemon" element={<PokemonScreenTemplate />} />
        <Route path="/project1/details/favorites" element={<FavoritePokemonsPage />} />
      </Routes>
    </>
  );
}

export default App;
