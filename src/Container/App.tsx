import { useCallback, useEffect, useState } from 'react';
import words from '../wordList.json';
import HangmanDrawing from '../Components/HangmanDrawing/HangmanDrawing';
import HangmanWord from '../Components/HangmanWord/HangmanWord';
import Keyboard from '../Components/Keyboard/Keyboard';

function App() {
  // Picks random word
  const [guessWord, setGuessWord] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter(letter => !guessWord.includes(letter))

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = guessWord.split("").every(letter => 
    guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
        //regular expression that checks if you clicked a keyboard button between a-z
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])


  console.log(guessWord)
  return <div style={{
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    margin: "0 auto",
    alignItems: "center"
  }}>
    <div style={{ fontSize: "2rem", textAlign: "center"}}>
      <h1>
        {isWinner && "You win!"}
        {isLoser && "You lose!"}
      </h1>
    </div>
    <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
    <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} guessWord={guessWord}/>
    <div style={{ alignSelf: "stretch"}}>
    <Keyboard disabled={isWinner || isLoser} activeLetter={guessedLetters.filter(letter => 
      guessWord.includes(letter)
      )}
      inactiveLetters={incorrectLetters}
      addGuessedLetter={addGuessedLetter}
    />
    </div>
  </div>
}

export default App
