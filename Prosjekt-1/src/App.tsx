import { Routes, Route,  } from 'react-router-dom'
import './App.css'
import ComponentTestPage from './pages/componentTestPage/ComponentTestPage';
import PokemonScreenTemplate from './pages/pokemonScreenTemplate/pokemonScreenTemplate';
import FavoritePokemonsPage from './pages/favoritePokemonsPage/favoritePokemonsPage';



function App() {

  return (
    
    <>
      <Routes>
        <Route path="/" element={<ComponentTestPage/>} />
        <Route path= "/details/:pokemon" element={<PokemonScreenTemplate/>}/>
        <Route path= "/details/favorites" element={<FavoritePokemonsPage/>}/>
      </Routes>
    </>
    
  )
}

export default App;
