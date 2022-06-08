import React, {useContext, useEffect} from "react";
import { AppContext } from "../App";


function Letter({ letterPos, attemptValue }) {
    const {board, correctWord, currAttempt, setDisabledLetters, disabledLetters} = useContext(AppContext);
    const letter = board[attemptValue][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "error");

    useEffect(()=>{
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters([...disabledLetters, letter]);
        }
    });


    return (
        <div className="letter" id={letterState}> 
            {letter}
        </div>
    );
}

export default Letter;