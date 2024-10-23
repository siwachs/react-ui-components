"use client";

import { useState, useEffect, useRef } from "react";

function useTimer(totalDuration: number) {
  const ref = useRef<null | NodeJS.Timeout>(null);

  const [isRunning, setIsRunning] = useState(false);
  const seconds = totalDuration;

  const clearTimer = () => {
    if (ref.current) clearInterval(ref.current);
  };

  useEffect(() => {
    if (isRunning) ref.current = setInterval(() => {}, 1000);

    return clearTimer;
  }, [isRunning]);

  function start() {
    setIsRunning(true);
  }

  function stop() {
    clearTimer();
    setIsRunning(false);
  }

  return { isRunning, start, stop, seconds };
}

export default useTimer;
