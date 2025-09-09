"use client";

import { use, useEffect, useState } from "react";

export function Time() {
  // Mast be INSIDE the JSX component
  // Effects are NOT executed on the server. only the default ("") is used
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  console.log("Time component rendered on client");
  return <div>Time: {time}</div>;
}

export function Time() {
  // Effect must be INSIDE the JSX component
  // Effects are NOT executed on the server. only the default ("") is used

  // State: if setTime(new_time) is called, every component that uses the 'time' state will re-render with the new value
  // The argument in useState is the initial state (default value)
  const [time, setTime] = useState("");

  // Effect: runs AFTER render. The second argument is an array of dependencies.
  // No array = run after every render, empty array = run once, after first render only, provide a value: run when value changes
  useEffect(() => {
    // Create an interval that updates the time every second
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup: clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty array → run once, after first render only

  console.log("Time component rendered on client");

  return <div>Time: {time}</div>;
}
