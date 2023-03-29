import { useEffect, useState } from 'react';
import './App.css';
import { TiTick, TiTimes } from 'react-icons/ti';

type Card = {
  selected: Boolean;
  color: string;
};

enum GameState {
  None = 'none',
  Started = 'started',
  Guessing = 'guessing',
  Correct = 'correct',
  Incorrect = 'incorrect',
}

const initialCards: string[] = [
  'red',
  'blue',
  'pink',
  'purple',
  'yellow',
  'orange',
  'brown',
  'green',
  'indigo',
];

function App() {
  const [cards, setCards] = useState<string[]>(initialCards);
  const [gameState, setGameState] = useState<GameState>(GameState.None);
  const [correctCard, setCorrectCard] = useState<number>(0);
  const [guessedCard, setGuessedCard] = useState<number>(0);

  const shuffle = (): void => {
    const newCards: string[] = [...cards];
    let currentIndex = newCards.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newCards[currentIndex], newCards[randomIndex]] = [
        newCards[randomIndex],
        newCards[currentIndex],
      ];
    }

    setCards(newCards);
  };

  const getStatusMessage = (): string => {
    if (gameState === GameState.Started) {
      return 'Memorize position of each color!';
    } else if (gameState === GameState.Guessing) {
      return 'Click the card that matches the color!';
    } else if (gameState === GameState.Correct) {
      return 'Too easy!';
    } else if (gameState === GameState.Incorrect) {
      return 'Hard luck!';
    } else {
      return 'Click play to start!';
    }
  };

  const reset = (): void => {
    shuffle();
    setCorrectCard(Math.floor(Math.random() * 10));
    setGuessedCard(-1);
  };

  const handlePlayClick = () => {
    setGameState(GameState.Started);
    setTimeout(() => {
      setGameState(GameState.Guessing);
    }, 3000);
  };

  const handleAttemptClick = (index: number) => {
    setGuessedCard(index);
    if (index === correctCard) {
      console.log('Correct');
      setGameState(GameState.Correct);
    } else {
      console.log('Incorrect');
      setGameState(GameState.Incorrect);
    }
    setTimeout(() => {
      reset();
      setGameState(GameState.None);
    }, 3000);
  };

  const colorToShow = (color: string) => {
    return gameState === GameState.Started ||
      gameState === GameState.Correct ||
      gameState === GameState.Incorrect
      ? color
      : 'slategray';
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="w-full h-screen bg-blue-900 text-gray-300">
      {/* Toolbar */}
      <div className=" w-full h-[50px] flex justify-between items-center px-3">
        <h1 className="text-3xl text-yellow-500">Memorize-It</h1>

        <div className="flex justify-center gap-4 text-lg">
          <button
            className="py-1 px-5 border border-gray-300 rounded hover:border-yellow-500 hover:bg-yellow-500 disabled:border-gray-700 disabled:bg-gray-700 disabled:hover:border-gray-700 disabled:hover:bg-gray-700"
            onClick={handlePlayClick}
            disabled={gameState !== GameState.None}
          >
            Play
          </button>
          {/* <button className="py-1 px-5 border border-gray-300 rounded hover:border-yellow-500 hover:bg-yellow-500">
            Scoreboard
          </button> */}
        </div>
      </div>

      {/* Status */}
      <div className="w-full flex justify-center text-2xl bold">
        {getStatusMessage()}
      </div>

      {/* Game */}
      <div className="w-full h-[600px] flex justify-center items-center">
        <div className="grid grid-cols-3 h-[500px] w-[500px] gap-5">
          {cards.map((color: string, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center border border-gray-300 rounded-lg cursor-pointer"
                style={{
                  backgroundColor: colorToShow(color),
                }}
                onClick={() => handleAttemptClick(index)}
              >
                {index === guessedCard ? (
                  <>
                    {gameState === GameState.Correct ? (
                      <TiTick color="black" size={150} />
                    ) : (
                      <TiTimes color="black" size={150} />
                    )}
                  </>
                ) : (
                  <TiTimes color={colorToShow(color)} size={150} />
                )}
              </div>
            );
          })}
        </div>
        {(gameState === GameState.Guessing ||
          gameState === GameState.Correct ||
          gameState === GameState.Incorrect) && (
          <div
            className="  w-[100px] h-[100px] mx-12 border border-gray-300 rounded-lg"
            style={{ backgroundColor: cards[correctCard] }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default App;
