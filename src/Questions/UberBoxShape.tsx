"use client";

import {
  MouseEvent,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";

// Data is going to be of 3X3 or Dynamic
const SHAPE_DATA = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 0, 1],
];

const Shape: React.FC<{ data: number[][] }> = ({ data }) => {
  // Update it to work with Dynamic Matrix
  // const flattenData = useMemo(() => data.flat(Infinity), [data]);

  const noOfVisibleBoxes = useMemo(
    () =>
      data.reduce((acc: number, row) => {
        row.forEach((box) => {
          if (box === 1) acc += 1;
        });

        return acc;
      }, 0),
    [data],
  );

  const [activeBoxes, setActiveBoxes] = useState(new Set());
  const [startDeselectBoxesLoading, setStartDeselectBoxesLoading] =
    useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const eventDeligationHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (startDeselectBoxesLoading) return;
    const target = e.target as HTMLElement;

    const index = target.getAttribute("data-index");
    const hiddenBox = target.getAttribute("data-hidden-box");

    if (!index || !hiddenBox) return;
    setActiveBoxes((prev) => new Set(prev.add(index)));
  };

  const startDeselectBoxes = useCallback(() => {
    setStartDeselectBoxesLoading(true);
    const activeKeys = Array.from(activeBoxes.keys());
    let index = 0;

    const removeActiveKeys = () => {
      if (activeKeys[index] !== undefined) {
        const currentActivekey = activeKeys[index];
        index += 1;

        setActiveBoxes((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(currentActivekey);

          return updatedSet;
        });

        timerRef.current = setTimeout(removeActiveKeys, 500);
      } else {
        if (timerRef.current) clearTimeout(timerRef.current);
        setStartDeselectBoxesLoading(false);
      }
    };

    timerRef.current = setTimeout(removeActiveKeys, 300);
  }, [activeBoxes]);

  useEffect(() => {
    if (activeBoxes.size >= noOfVisibleBoxes) startDeselectBoxes();
  }, [activeBoxes.size, noOfVisibleBoxes, startDeselectBoxes]);

  return (
    <div
      title="Interactive Shape"
      role="button"
      tabIndex={0}
      // To Bubble UP event to parent
      onClick={eventDeligationHandler}
      className="w-fit p-14"
    >
      {data.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="flex gap-5 pb-5 last:pb-0">
            {row.map((column, columnIndex) => {
              const hiddenBox = column === 0;

              const index = `${rowIndex}${columnIndex}`;
              const isActive = activeBoxes.has(index);

              return (
                <div
                  data-hidden-box={hiddenBox}
                  data-index={index}
                  key={index}
                  className={`${hiddenBox && "pointer-events-none opacity-0"} ${isActive && "pointer-events-none bg-green-400"} size-20 border border-black transition-colors`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const UberBoxShape = () => {
  return <Shape data={SHAPE_DATA} />;
};

export default UberBoxShape;
