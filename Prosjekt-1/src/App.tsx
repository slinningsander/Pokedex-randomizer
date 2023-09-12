import { Routes, Route,  } from 'react-router-dom'
import './App.css'
import ComponentTestPage from './pages/componentTestPage/ComponentTestPage';
import PokemonScreenTemplate from './pages/pokemonScreenTemplate/pokemonScreenTemplate';



function App() {

  return (
    
    <>
      <Routes>
        <Route path="/" element={<ComponentTestPage/>} />
        <Route path= "/details" element={<PokemonScreenTemplate name={''} type={''} height={0} weight={0} abilities={[]} moves={[]}/>}/>
      </Routes>
    </>
    
  )
}

export default App;
