import Pokedex from "./components/Pokedex/Pokedex"
import PokemonDetails from "./components/PokemonDetails/PokemonDetails"
import { Routes, Route } from "react-router-dom";


function App() {


  return (
    <>
     <Routes>
        <Route path="/" element={<Pokedex/>} />
        <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        <Route path="*" element={<h1>  not found</h1>} />


     </Routes>
     </>
  )
}

export default App
