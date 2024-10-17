"use client";

import { useMemo, useState, useEffect, Dispatch, SetStateAction } from "react";

const TOTAL_BOXES = 12; // Boxes always divisible by 4 it is always going to be a 4 column grid

// Click on GRID it reveal a color and stay in reveal state and click on other grid gives other color if they are not same then it remove that color reveal in 400ms

const letters = "0123456789ABCDEF";
function getRandomColors(limit: number) {
  const numOfColors = limit / 2;

  function getRandomColor() {
    let color = "#";

    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];

    return color;
  }

  const colorPairs = [];
  for (let i = 0; i < numOfColors; i++) {
    const color = getRandomColor();
    colorPairs.push(color, color);
  }

  for (let i = colorPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [colorPairs[i], colorPairs[j]] = [colorPairs[j], colorPairs[i]];
  }

  return colorPairs;
}

const Box: React.FC<{
  backgroundColor: string;
  onClick: (currentBgColor: string) => void;
  revealedColors: Set<string>;
  activeColors: string[];
}> = ({ backgroundColor, onClick, revealedColors, activeColors }) => {
  const isRevealedColor = revealedColors.has(backgroundColor);
  const [active, setActive] = useState(false);

  function toogleActive() {
    if (active) return;

    setActive(true);
    onClick(backgroundColor);
  }

  useEffect(() => {
    if (!isRevealedColor && activeColors.length === 0) setActive(false);
  }, [isRevealedColor, activeColors.length]);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={toogleActive}
      onKeyDown={undefined}
      style={{ backgroundColor: active ? backgroundColor : "white" }}
      className="size-52 border border-black transition-colors duration-[400ms]"
    />
  );
};

const GameOver: React.FC<{ onClick: () => void; noOfRounds: number }> = ({
  onClick,
  noOfRounds,
}) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-center text-2xl font-bold">
        Game Over in {noOfRounds} rounds
      </h2>

      <button
        type="button"
        className="rounded-md border p-2.5 font-bold"
        onClick={onClick}
      >
        Start Again
      </button>
    </div>
  );
};

const GameBoard: React.FC<{
  revealedColors: Set<string>;
  setRevealedColors: Dispatch<SetStateAction<Set<string>>>;
  activeColors: string[];
  setActiveColors: Dispatch<SetStateAction<string[]>>;
  setNoOfRounds: Dispatch<SetStateAction<number>>;
}> = ({
  revealedColors,
  setRevealedColors,
  activeColors,
  setActiveColors,
  setNoOfRounds,
}) => {
  const boxes = useMemo(() => getRandomColors(TOTAL_BOXES), []);

  const onBoxClick = (currentBgColor: string) => {
    if (activeColors.length === 0) return setActiveColors([currentBgColor]);
    else if (activeColors[0] === currentBgColor) {
      setRevealedColors((prev) => new Set(prev.add(currentBgColor)));
      setActiveColors([]);
    } else
      setTimeout(() => {
        setActiveColors([]);
      }, 400);

    setNoOfRounds((prev) => prev + 1);
  };

  return (
    <div className="grid w-fit grid-cols-4">
      {boxes.map((color, index) => (
        <Box
          key={index}
          backgroundColor={color}
          onClick={onBoxClick}
          revealedColors={revealedColors}
          activeColors={activeColors}
        />
      ))}
    </div>
  );
};

const ColorMatchGame = () => {
  const [noOfRounds, setNoOfRounds] = useState(0);

  const [revealedColors, setRevealedColors] = useState(new Set<string>());
  const [activeColors, setActiveColors] = useState<string[]>([]);

  function startAgain() {
    setActiveColors([]);
    setRevealedColors(new Set<string>());
    setNoOfRounds(0);
  }

  return revealedColors.size === TOTAL_BOXES / 2 ? (
    <GameOver onClick={startAgain} noOfRounds={noOfRounds} />
  ) : (
    <GameBoard
      revealedColors={revealedColors}
      setRevealedColors={setRevealedColors}
      activeColors={activeColors}
      setActiveColors={setActiveColors}
      setNoOfRounds={setNoOfRounds}
    />
  );
};

export default ColorMatchGame;
