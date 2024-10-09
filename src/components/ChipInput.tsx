"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { debounce } from "lodash";

type ChipItem = {
  avatar: string;
  username: string;
  email: string;
};

interface ChipInputProps {
  items: ChipItem[];
  className?: string;
  style?: React.CSSProperties;
}

const ChipInput: React.FC<ChipInputProps> = ({ items, className, style }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedChips, setSelectedChips] = useState<ChipItem[]>([]);
  const [availableItems, setAvailableItems] = useState<ChipItem[]>(items);
  const [showList, setShowList] = useState<boolean>(false);
  const [listPosition, setListPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [highlightLastChip, setHighlightLastChip] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    return availableItems.filter((item) =>
      item.username.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [availableItems, inputValue]);

  const handleItemClick = (item: ChipItem) => {
    setAvailableItems((prevItems) =>
      prevItems.filter((i) => i.email !== item.email)
    );
    setSelectedChips((prevChips) => [...prevChips, item]);
    setInputValue("");
  };
  const handleItemClickDebounced = debounce(handleItemClick, 300);

  const handleRemoveChip = (index: number) => {
    const removedChip = selectedChips[index];
    setAvailableItems((prevItems) => [...prevItems, removedChip]);
    setSelectedChips((prevChips) => prevChips.filter((_, i) => i !== index));
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      if (selectedChips.length > 0 && !highlightLastChip) {
        setHighlightLastChip(true);
      } else if (selectedChips.length > 0 && highlightLastChip) {
        const lastChip = selectedChips[selectedChips.length - 1];
        setAvailableItems((prevItems) => [...prevItems, lastChip]);
        setSelectedChips((prevChips) => prevChips.slice(0, -1));
        setHighlightLastChip(false);
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setHighlightLastChip(false);
      setShowList(false);
    }, 200);
  };

  const renderChips = () =>
    selectedChips.map((chip, index) => (
      <div
        key={chip.email}
        className={`flex items-center bg-gray-300 rounded-full text-sm ${
          highlightLastChip && index === selectedChips.length - 1
            ? "border-[1.5px] border-blue-600"
            : ""
        }`}
      >
        <img
          src={chip.avatar}
          alt={chip.username}
          className="w-5 h-5 rounded-full mr-1"
        />
        <span>{chip.username}</span>
        <button
          className="ml-2 mr-1 text-lg leading-none"
          onClick={() => handleRemoveChip(index)}
        >
          &times;
        </button>
      </div>
    ));

  const renderList = () =>
    filteredItems.map((item) => (
      <li
        key={item.email}
        onClick={() => handleItemClickDebounced(item)}
        onKeyDown={() => {}}
        tabIndex={0}
        className="cursor-pointer hover:bg-gray-200 p-2 text-sm grid grid-cols-2"
      >
        <div className="flex items-center">
          <img
            src={item.avatar}
            alt={item.username}
            className="w-6 h-6 rounded-full ml-2.5 mr-2"
          />
          <span className="font-semibold">{item.username}</span>
        </div>
        <span className="text-gray-400 overflow-hidden whitespace-nowrap">
          {item.email}
        </span>
      </li>
    ));

  useEffect(() => {
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setListPosition({ top: inputRect.bottom, left: inputRect.left });
    }
  }, [availableItems]);

  return (
    <div className={className} style={style}>
      <div className="border-b focus-within:border-b-[2.5px] focus-within:border-blue-600 flex flex-wrap items-center space-x-3">
        {renderChips()}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowList(true)}
          onBlur={handleBlur}
          onKeyDown={handleBackspace}
          placeholder="Add new user..."
          className="focus:outline-none flex-grow"
        />
      </div>

      {showList && availableItems.length > 0 && (
        <ul
          className="bg-white border rounded max-w-72 w-full max-h-64 overflow-y-auto"
          style={{
            position: "absolute",
            top: `${listPosition.top}px`,
            left: `${listPosition.left}px`,
          }}
        >
          {renderList()}
        </ul>
      )}
    </div>
  );
};

export default ChipInput;
