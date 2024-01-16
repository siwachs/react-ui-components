import React, { useState, useRef, useEffect } from "react";

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

const Chip: React.FC<{
  avatar: string;
  username: string;
  onRemove: () => void;
}> = ({ avatar, username, onRemove }) => {
  return (
    <div className="flex items-center bg-gray-300 rounded-full text-sm">
      <img src={avatar} alt={username} className="w-5 h-5 rounded-full mr-1" />
      <span>{username}</span>
      <button className="ml-2 mr-1 text-lg leading-none" onClick={onRemove}>
        &times;
      </button>
    </div>
  );
};

const ChipInput: React.FC<ChipInputProps> = ({ items, className, style }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedChips, setSelectedChips] = useState<ChipItem[]>([]);
  const [availableItems, setAvailableItems] = useState<ChipItem[]>(items);
  const [showList, setShowList] = useState<boolean>(false);
  const [listPosition, setListPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = availableItems.filter((item) =>
    item.username.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleItemClick = (item: ChipItem) => {
    setAvailableItems((prevItems) =>
      prevItems.filter((i) => i.email !== item.email)
    );
    setSelectedChips((prevChips) => [...prevChips, item]);
    setInputValue("");
    setShowList(false);
  };

  const handleRemoveChip = (index: number) => {
    const removedChip = selectedChips[index];
    setAvailableItems((prevItems) => [...prevItems, removedChip]);
    setSelectedChips((prevChips) => prevChips.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setListPosition({ top: inputRect.bottom, left: inputRect.left });
    }
  }, [availableItems]);

  return (
    <div className={className} style={style}>
      <div className="border-b focus-within:border-b-[2.5px] focus-within:border-blue-600 flex flex-wrap items-center space-x-3">
        {selectedChips.map((chip, index) => (
          <Chip
            key={chip.email}
            avatar={chip.avatar}
            username={chip.username}
            onRemove={() => handleRemoveChip(index)}
          />
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            setShowList(true);
          }}
          placeholder="Add new user..."
          className="focus:outline-none flex-grow"
        />
      </div>

      {showList && availableItems.length > 0 && (
        <ul
          className="bg-white border rounded max-w-64 w-full max-h-64 overflow-y-auto"
          style={{
            position: "absolute",
            top: `${listPosition.top}px`,
            left: `${listPosition.left}px`,
          }}
        >
          {filteredItems.map((item) => (
            <li
              key={item.email}
              onClick={() => handleItemClick(item)}
              onKeyDown={() => {}}
              tabIndex={0}
              className="cursor-pointer hover:bg-gray-200 p-2 text-xs grid grid-cols-2"
            >
              <div className="flex items-center">
                <img
                  src={item.avatar}
                  alt={item.username}
                  className="w-6 h-6 rounded-full ml-2.5 mr-2"
                />
                <span className="font-semibold">{item.username}</span>
              </div>
              <span className="text-gray-400">{item.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipInput;
