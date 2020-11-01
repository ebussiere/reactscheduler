import React, { useState, useEffect } from 'react';
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const newHistory = [];
  function transition(tr, replace = false) {
    setMode(tr);
    if (!replace) {
      newHistory.push(tr);
      setHistory([...history, ...newHistory]);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setMode(history[history.length - 2]);
    }
  }

  return { mode: mode, transition, back };
};
export default useVisualMode;
