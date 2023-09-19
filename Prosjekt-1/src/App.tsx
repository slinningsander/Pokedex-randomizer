import { Routes, Route } from 'react-router-dom';
import './App.css';
import ComponentTestPage from './pages/componentTestPage/ComponentTestPage';
import PokemonScreenTemplate from './pages/pokemonScreenTemplate/pokemonScreenTemplate';

function App() {
  return (
    <>
      <Routes>
        <Route path="/project1" element={<ComponentTestPage />} />
        <Route path="/project1/details/:pokemon" element={<PokemonScreenTemplate />} />
      </Routes>
    </>
  );
}

export default App;
