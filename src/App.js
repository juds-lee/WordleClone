import './App.css';
import Keyboard from './Components/Keyboard';
import Board from './Components/Board';
import {createContext, useState} from 'react';
import { boardDefault } from './Words';

export const AppContext = createContext();

function App() {
   const [board, setBoard] = useState(boardDefault);
   const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider 
      value={{board, setBoard, currAttempt, setCurrAttempt }}
      >
        <div className='game'>
          <Board />
          <Keyboard /> 
        </div> 
      </AppContext.Provider>
    </div>
  );
}

export default App;
