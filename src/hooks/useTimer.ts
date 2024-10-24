"use client";

import { useState, useRef, useEffect } from "react";

function useTimer(totalDuration: number) {
  // use to persist a value or store a DOM node ref without trigger a re-render and persist value beyond re-render
  const ref = useRef<null | NodeJS.Timeout>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(totalDuration);

  const clearTimer = () => {
    if (ref.current) clearInterval(ref.current);
  };

  function start() {
    setSeconds(totalDuration);
    setIsRunning(true);

    ref.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearTimer();
          setIsRunning(false);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }

  function stop() {
    clearTimer();
    setIsRunning(false);
  }

  function pause() {
    setIsPaused(true);
    clearTimer();
  }

  function resume() {
    setIsPaused(false);

    ref.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearTimer();
          setIsRunning(false);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return clearTimer;
  }, []);

  return { isRunning, isPaused, pause, resume, start, stop, seconds };
}

export default useTimer;
