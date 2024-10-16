"use client";

import { useState } from "react";

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
  onClick: (backgroundColor: string) => void;
}> = ({ backgroundColor, onClick }) => {
  const [active, setActive] = useState(false);

  function toogleActive() {
    if (active) return;

    setActive(true);
    onClick(backgroundColor);
  }

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

const ColorMatchGame = () => {
  const boxes = getRandomColors(TOTAL_BOXES);

  const [revealedColors, setRevealedColors] = useState(new Set<string>());
  const [activeColors, setActiveColors] = useState<string[]>([]);

  const onBoxClick = (backgroundColor: string) => {
    if (activeColors.length === 0) return setActiveColors([backgroundColor]);
  };

  return (
    <div className="grid w-fit grid-cols-4">
      {boxes.map((color, index) => (
        <Box key={index} backgroundColor={color} onClick={onBoxClick} />
      ))}
    </div>
  );
};

export default ColorMatchGame;
