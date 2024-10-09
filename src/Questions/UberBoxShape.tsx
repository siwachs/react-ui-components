"use client";

import {
  MouseEvent,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";

// Data is going to be of 3X3
const SHAPE_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const Shape: React.FC<{ data: number[][] }> = ({ data }) => {
  const flattenData = useMemo(() => data.flat(Infinity), [data]);
  const noOfVisibleBoxes = useMemo(
    () =>
      flattenData.reduce((acc: number, box) => {
        if (box === 1) acc += 1;

        return acc;
      }, 0),
    [flattenData],
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

    const removeActiveKeys = () => {
      if (activeKeys.length) {
        const currentActivekey = activeKeys.shift();

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
      role="button"
      tabIndex={0}
      // To Bubble UP event to parent
      onClick={eventDeligationHandler}
      className="grid w-fit grid-cols-3 gap-5 p-14"
    >
      {flattenData.map((box, index) => {
        const hiddenBox = box === 0;
        const isActive = activeBoxes.has(index.toString());

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
};

const UberBoxShape = () => {
  return <Shape data={SHAPE_DATA} />;
};

export default UberBoxShape;
