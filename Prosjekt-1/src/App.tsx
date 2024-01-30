import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import PokemonScreenTemplate from './pages/PokemonScreenTemplate/PokemonScreenTemplate';
import FavoritePokemonsPage from './pages/FavoritePokemonsPage/FavoritePokemonsPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:pokemon" element={<PokemonScreenTemplate />} />
        <Route path="/details/favorites" element={<FavoritePokemonsPage />} />
      </Routes>
    </>
  );
}

export default App;
