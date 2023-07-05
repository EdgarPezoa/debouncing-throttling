import React, { useState } from "react";

type Fn = (...args: any[]) => void;
function App() {
  const [debounceCount, setDebounceCount] = useState<number>(0);
  const [throttleCount, setThrottleCount] = useState<number>(0);
  const [debounceTimerID, setDebounceTimerID] = useState<NodeJS.Timeout>();
  const [throttleTimerID, setThrottleTimerID] = useState<NodeJS.Timeout | null>(null);

  const countStateSum = (num:number) => (num+1);

  const throttle = (callback:Fn, delay = 1000) => {
    if(throttleTimerID == null){
      callback();
      setThrottleTimerID(setTimeout(() => {
        setThrottleTimerID(null);
      },delay));
    }
  };

  const debounce = (callback:Fn, delay = 500) => {
      clearTimeout(debounceTimerID);
      setDebounceTimerID(setTimeout(callback, delay));
  };

	return (
      <>
		<div>
			<h2>Debounce</h2>
			<p>Count: {debounceCount}</p>
            <input onChange={
                ()=> (debounce(()=>setDebounceCount(countStateSum)))
              }
            />
		</div>
        <div>
			<h2>Throttle</h2>
            <p>Count: {throttleCount}</p>
            <input onChange={
                () => (throttle(()=>setThrottleCount(countStateSum)))
              }
            />
		</div>
      </>
	);
}

export default App;
