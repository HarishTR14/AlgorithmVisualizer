import React, { useState, useEffect, useRef } from "react";
import "./DynamicProgramming.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
const sampleCodes = {
  javascript: [
    "function fib(n) {",
    "  if(n <= 1) return n;",
    "  const dp = [0, 1];",
    "  for(let i = 2; i <= n; i++) {",
    "    dp[i] = dp[i-1] + dp[i-2];", // <-- Highlight this line when updating dp
    "  }",
    "  return dp[n];",
    "}",
    "console.log(fib(10));",
  ],
  python: [
    "def fib(n):",
    "    if n <= 1:",
    "        return n",
    "    dp = [0, 1]",
    "    for i in range(2, n+1):",
    "        dp.append(dp[i-1] + dp[i-2])", // <-- Highlight this line when updating dp
    "    return dp[n]",
    "print(fib(10))",
  ],

  java: [
    "public class Fibonacci {",
    "    public static int fib(int n) {",
    "        if (n <= 1) return n;",
    "        int[] dp = new int[n + 1];",
    "        dp[0] = 0; dp[1] = 1;",
    "        for (int i = 2; i <= n; i++) {",
    "            dp[i] = dp[i - 1] + dp[i - 2];", // <-- Highlight this line when updating dp
    "        }",
    "        return dp[n];",
    "    }",
    "    public static void main(String[] args) {",
    "        System.out.println(fib(10));",
    "    }",
    "}",
  ],

  cpp: [
    "#include <iostream>",
    "#include <vector>",
    "using namespace std;",
    "int fib(int n) {",
    "    if (n <= 1) return n;",
    "    vector<int> dp(n + 1);",
    "    dp[0] = 0; dp[1] = 1;",
    "    for (int i = 2; i <= n; i++) {",
    "        dp[i] = dp[i - 1] + dp[i - 2];", // <-- Highlight this line when updating dp
    "    }",
    "    return dp[n];",
    "}",
    "int main() {",
    "    cout << fib(10) << endl;",
    "    return 0;",
    "}",
  ],
};

function DynamicProgramming() {
  const [inputValue, setInputValue] = useState(10);
  const [dp, setDp] = useState([]);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [codeHighlightIndex, setCodeHighlightIndex] = useState(null);

  const dpTimerRef = useRef(null);
  const currentIndexRef = useRef(2); // Start updating from index 2

  // Start the DP animation
  const handleStart = () => {
    const n = parseInt(inputValue, 10);
    if (isNaN(n) || n < 0) return;
    const initialDp = [];
    initialDp[0] = 0;
    initialDp[1] = 1;
    for (let i = 2; i <= n; i++) {
      initialDp[i] = null; // Not computed yet
    }
    setDp(initialDp);
    currentIndexRef.current = 2;
    setResult(null);
    setIsRunning(true);
    setCodeHighlightIndex(null);
  };
  const speedOptions = {
    slow: 2000,
    normal: 1000,
    fast: 500,
  };
  const handlePause = () => {
    setIsRunning(false);
    clearInterval(dpTimerRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(dpTimerRef.current);
    setDp([]);
    setResult(null);
    setCodeHighlightIndex(null);
  };

  useEffect(() => {
    if (isRunning) {
      const n = parseInt(inputValue, 10);
      dpTimerRef.current = setInterval(() => {
        setDp((prevDp) => {
          const newDp = [...prevDp];
          if (currentIndexRef.current <= n) {
            newDp[currentIndexRef.current] =
              newDp[currentIndexRef.current - 1] +
              newDp[currentIndexRef.current - 2];
            // Trigger code highlight for the dp update operation:
            if (selectedLang === "javascript") {
              setCodeHighlightIndex(4); // Highlight the line with dp[i] = ...
            } else if (selectedLang === "python") {
              setCodeHighlightIndex(5);
            } else if (selectedLang === "java") {
              setCodeHighlightIndex(6);
            } else if (selectedLang === "cpp") {
              setCodeHighlightIndex(8);
            }
            // Clear the code highlight after half the speed interval.
            setTimeout(() => {
              setCodeHighlightIndex(null);
            }, speed / 2);
          }
          return newDp;
        });
        currentIndexRef.current += 1;
        if (currentIndexRef.current > n) {
          clearInterval(dpTimerRef.current);
          setIsRunning(false);
          // The final result is in dp[n] (state update might be asynchronous;
          // you can also compute it directly if needed)
          setResult((prevDp) => {
            return dp[n]; // or compute directly
          });
        }
      }, speed);
    }
    return () => clearInterval(dpTimerRef.current);
  }, [isRunning, inputValue, speed, selectedLang, dp]);

  return (
    <div className="dp-container">
      <div className="visualization-container">
        <h2>Dynamic Programming: Fibonacci</h2>
        <p>
          Enter a number to compute <strong>Fibonacci(n)</strong> using a
          dynamic programming approach. Watch the DP array fill in step-by-step.
        </p>
        <div className="input-container">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min="0"
            className="height-inputW2"
          />
        </div>
        <div className="dp-visual">
          <h3>DP Array:</h3>
          <div className="dp-array">
            {dp.map((value, index) => (
              <div key={index} className="dp-box">
                {value !== null ? value : "-"}
                <div className="dp-index">{index}</div>
              </div>
            ))}
          </div>
        </div>
        {result !== null && (
          <p style={{ fontWeight: "bold" }}>Result (Fibonacci(n)): {result}</p>
        )}
      </div>

      <div className="code-container">
        <h2 className="codeSnippetH2">Sample Dynamic Programming Code</h2>
        <div className="snippet-buttonsLanguage">
          <button onClick={() => setSelectedLang("javascript")}>
            JavaScript
          </button>
          <button onClick={() => setSelectedLang("python")}>Python</button>
          <button onClick={() => setSelectedLang("java")}>Java</button>
          <button onClick={() => setSelectedLang("cpp")}>C++</button>
        </div>
        <hr
          style={{
            backgroundColor: "#ece7e7",
            height: "1px",
            border: "none",
          }}
        />
        <pre>
          {sampleCodes[selectedLang].map((line, index) => (
            <div
              key={index}
              className={`code-line ${
                index === codeHighlightIndex ? "highlight" : ""
              }`}
            >
              {line}
            </div>
          ))}
        </pre>
        <hr
          style={{ backgroundColor: "#ece7e7", height: "1px", border: "none" }}
        />

        <div className="controls-speed-container">
          <h2 className="codeSnippetH3">Controls:</h2>
          <div className="snippet-buttonsDP">
            <button onClick={handleStart}>
              <FaPlay
                style={{
                  color: "#7ce33a ",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </button>
            <button onClick={handlePause}>
              <FaPause
                style={{
                  color: "blue",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </button>
            <button onClick={handleReset}>
              <FaStop
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </button>
          </div>
          <h2 className="codeSnippetH3">Speed:</h2>
          <div className="snippet-buttonsDP">
            <button onClick={() => setSpeed(speedOptions.slow)}>0.5x</button>
            <button onClick={() => setSpeed(speedOptions.normal)}>1x</button>
            <button onClick={() => setSpeed(speedOptions.fast)}>2x</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicProgramming;
