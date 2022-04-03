import React from 'react';
import './App.css';
import {PokeCard} from './component/PokeCard/PokeCard';

const App: React.FC = () => {
  return (
    <div className="App">
       <PokeCard/>
    </div>
  );
}

export default App;
