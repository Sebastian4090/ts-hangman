
type HangmanWordProps = {
    guessedLetters: string[]
    guessWord: string
    reveal?: boolean
}


const HangmanWord = ( { guessedLetters, guessWord, reveal= false } : HangmanWordProps ) => {
    return <div style={{ 
                    display: "flex", 
                    gap: ".25em", 
                    fontSize: "6rem", 
                    fontWeight: "bold", 
                    textTransform: "uppercase", 
                    fontFamily: "monospace" }}>
                    {guessWord.split("").map((letter, index) => (
                        <span style={{ borderBottom: ".1em solid black" }}>
                            <span style={{ visibility: guessedLetters.includes(letter) || reveal 
                                ? "visible" 
                                : "hidden", 
                                color: !guessedLetters.includes(letter) && reveal ? "red" : "black"}}>
                                    {letter}
                                </span>
                            </span>
                    ))}
                    </div>
}

export default HangmanWord;