import React from 'react';
import './App.css';
import PokeCard from './component/PokeCard/PokeCard';

const App: React.FC = () => {
  return (
    <div className="App">
        <h2>Pokédex</h2>
       <PokeCard/>
    </div>
  );
}

export default App;
