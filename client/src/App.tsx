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
  Wrong = 'wrong',
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
  const [selected, setSelected] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>(GameState.None);

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

  const reset = (): void => {
    shuffle();
    setSelected(Math.floor(Math.random() * 10));
  };

  const handlePlayClick = () => {
    setGameState(GameState.Started);
    setTimeout(() => {
      setGameState(GameState.Guessing);
    }, 3000);
  };

  const handleAttemptClick = (index: number) => {
    if (index === selected) {
      console.log('Correct');
      setGameState(GameState.Correct);
    } else {
      console.log('Incorrect');
      setGameState(GameState.Wrong);
    }
    setTimeout(() => {
      reset();
      setGameState(GameState.None);
    }, 3000);
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="w-full h-screen bg-blue-900 text-gray-300">
      {/* Toolbar */}
      <div className="absolute w-full h-[50px] flex justify-between items-center px-3">
        <h1 className="text-2xl">Memorize-It</h1>

        <div className="flex justify-center gap-4 text-lg">
          <button
            className="py-1 px-5 border border-gray-300 rounded hover:border-yellow-500 hover:bg-yellow-500"
            onClick={handlePlayClick}
          >
            Play
          </button>
          {/* <button className="py-1 px-5 border border-gray-300 rounded hover:border-yellow-500 hover:bg-yellow-500">
            Scoreboard
          </button> */}
        </div>
      </div>

      {/* Game */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="grid grid-cols-3 h-[500px] w-[500px] gap-5">
          {cards.map((color: string, index: number) => {
            return (
              <div
                key={index}
                className="border border-gray-300 rounded-lg cursor-pointer"
                style={{
                  backgroundColor:
                    gameState === GameState.Started ||
                    gameState === GameState.Correct ||
                    gameState === GameState.Wrong
                      ? color
                      : 'slategray',
                }}
                onClick={() => handleAttemptClick(index)}
              ></div>
            );
          })}
        </div>
        {(gameState === GameState.Guessing ||
          gameState === GameState.Correct ||
          gameState === GameState.Wrong) && (
          <div
            className="flex justify-center items-center  w-[100px] h-[100px] mx-12 border border-gray-300 rounded-lg"
            style={{ backgroundColor: cards[selected] }}
          >
            {gameState === GameState.Correct && <TiTick color="black" />}
            {gameState === GameState.Wrong && <TiTimes color="black" />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
