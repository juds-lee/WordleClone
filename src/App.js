import './App.css';
import Keyboard from './Components/Keyboard';
import Board from './Components/Board';
import {createContext, useEffect, useState} from 'react';
import { boardDefault, generateWordSet } from './Words';
import GameOver from './Components/GameOver';

export const AppContext = createContext();

function App() {
   const [board, setBoard] = useState(boardDefault);
   const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
   const [wordSet, setWordSet] = useState(new Set());
   const [disabledLetters, setDisabledLetters] = useState([]);
   const [correctWord, setCorrectWord] = useState("");
   const [gameOver, setGameOver] = useState({
     gameOver: false,
     guessedWord: false
    });


  useEffect(()=> {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    })
  }, [])

   const onEnter = () => {
     if (currAttempt.letterPos !== 5) return;
     let currWord = "";
     for (let i = 0; i < 5; i++){
       currWord += board[currAttempt.attempt][i];
     }
      if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
     } else {
       alert("word not found")
     } if (currWord.toLowerCase()  === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }  if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };
  
   const onDelete = () => {
     if (currAttempt.letterPos === 0) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos -1] = "";
      setBoard(newBoard);
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos -1});
   };
   const onSelectLetter = (keyVal) => {
     if (currAttempt.letterPos > 4) 
      return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
      setBoard(newBoard);
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos +1  });
   };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider 
      value={{
        board, 
        setBoard, 
        currAttempt, 
        setCurrAttempt, 
        onDelete, 
        onEnter, 
        onSelectLetter,
        correctWord,
        setDisabledLetters,
        disabledLetters,
        setGameOver,
        gameOver
      }}
      >
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> 
          : <Keyboard />}
        </div> 
      </AppContext.Provider>
    </div>
  );
}

export default App;
