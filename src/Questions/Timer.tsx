"use client";

import useTimer from "@/hooks/useTimer";

const Timer = () => {
  const { isRunning, start, stop } = useTimer(6);

  return (
    <div>
      <h1 className="my-5 select-none text-center text-3xl font-bold">
        useTimer Hook
      </h1>

      <div className="mx-auto flex w-fit flex-col items-center gap-3">
        <span className="select-none text-lg font-bold">
          {isRunning ? 5 : "No timer running"}
        </span>

        <div className="flex items-center gap-5">
          <button
            onClick={start}
            disabled={isRunning}
            className="rounded-md border p-3.5 disabled:bg-gray-300"
          >
            Start Timer
          </button>

          <button
            onClick={stop}
            disabled={!isRunning}
            className="rounded-md border p-3.5 disabled:bg-gray-300"
          >
            Stop Timer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
