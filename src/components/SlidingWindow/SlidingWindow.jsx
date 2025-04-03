import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./SlidingWindow.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

const sampleCodes = {
  javascript: [
    "let maxSum = 0;",
    "let windowSum = 0;",
    "for (let i = 0; i < k; i++) {",
    "    windowSum += arr[i];",
    "}",
    "maxSum = windowSum;",
    "for (let i = k; i < arr.length; i++) {",
    "    windowSum += arr[i] - arr[i - k];",
    "    maxSum = Math.max(maxSum, windowSum);",
    "}",
    "console.log('Max sum:', maxSum);",
  ],
  python: [
    "max_sum = 0",
    "window_sum = sum(arr[:k])",
    "max_sum = window_sum",
    "for i in range(k, len(arr)):",
    "    window_sum += arr[i] - arr[i - k]",
    "    max_sum = max(max_sum, window_sum)",
    "print('Max sum:', max_sum)",
  ],
  java: [
    "import java.util.*;",
    "public class SlidingWindow {",
    "    public static int maxSumSubarray(int[] arr, int k) {",
    "        if (arr.length < k) return -1;",
    "        int maxSum = 0, windowSum = 0;",
    "        for (int i = 0; i < k; i++) windowSum += arr[i];",
    "        maxSum = windowSum;",
    "        for (int i = k; i < arr.length; i++) {",
    "            windowSum += arr[i] - arr[i - k];",
    "            maxSum = Math.max(maxSum, windowSum);",
    "        }",
    "        return maxSum;",
    "    }",
    "    public static void main(String[] args) {",
    "        int[] arr = {1, 3, 2, 6, -1, 4, 1, 8, 2};",
    "        int k = 3;",
    '        System.out.println("Max sum: " + maxSumSubarray(arr, k));',
    "    }",
    "}",
  ],
  cpp: [
    "#include <iostream>",
    "#include <vector>",
    "#include <algorithm>",
    "using namespace std;",
    "int maxSumSubarray(vector<int>& arr, int k) {",
    "    if (arr.size() < k) return -1;",
    "    int maxSum = 0, windowSum = 0;",
    "    for (int i = 0; i < k; i++) windowSum += arr[i];",
    "    maxSum = windowSum;",
    "    for (int i = k; i < arr.size(); i++) {",
    "        windowSum += arr[i] - arr[i - k];",
    "        maxSum = max(maxSum, windowSum);",
    "    }",
    "    return maxSum;",
    "}",
    "int main() {",
    "    vector<int> arr = {1, 3, 2, 6, -1, 4, 1, 8, 2};",
    "    int k = 3;",
    '    cout << "Max sum: " << maxSumSubarray(arr, k) << endl;',
    "    return 0;",
    "}",
  ],
};

// Highlight line indices for each language
const highlightIndices = {
  javascript: {
    windowSumUpdate: 7, // "windowSum += arr[i] - arr[i - k];"
    maxSumUpdate: 8, // "maxSum = Math.max(maxSum, windowSum);"
  },
  python: {
    windowSumUpdate: 4, // "window_sum += arr[i] - arr[i - k]"
    maxSumUpdate: 5, // "max_sum = max(max_sum, window_sum)"
  },
  java: {
    windowSumUpdate: 8, // "windowSum += arr[i] - arr[i - k];"
    maxSumUpdate: 9, // "maxSum = Math.max(maxSum, windowSum);"
  },
  cpp: {
    windowSumUpdate: 10, // "windowSum += arr[i] - arr[i - k];"
    maxSumUpdate: 11, // "maxSum = max(maxSum, windowSum);"
  },
};

const speedOptions = {
  slow: 5000,
  normal: 3000,
  fast: 2000,
};

function SlidingWindow() {
  const [arrInput, setArrInput] = useState("1,3,2,6,-1,4,1,8,2");
  const [arr, setArr] = useState([1, 3, 2, 6, -1, 4, 1, 8, 2]);
  const [k, setK] = useState(3);
  const [maxSum, setMaxSum] = useState(0);
  const [currentSum, setCurrentSum] = useState(0);
  const [currentWindowStart, setCurrentWindowStart] = useState(0);
  const [highlightLine, setHighlightLine] = useState(null);
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [speed, setSpeed] = useState("normal");
  const [running, setRunning] = useState(false);

  // Refs to hold mutable data without re-renders.
  const intervalRef = useRef(null);
  const indexRef = useRef(0);
  const sumRef = useRef(0);

  // Reset sums and window highlight when array, k, or speed change.
  useEffect(() => {
    setMaxSum(0);
    setCurrentSum(0);
    setCurrentWindowStart(0);
    setHighlightLine(null);
  }, [arr, k, speed]);

  const handlePlay = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleStop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    // Reset all values
    setMaxSum(0);
    setCurrentSum(0);
    setCurrentWindowStart(0);
    setHighlightLine(null);
    indexRef.current = 0;
    sumRef.current = 0;
  };

  useEffect(() => {
    if (running) {
      // Initialize window: compute sum of the first 'k' elements.
      let initialSum = 0;
      for (let i = 0; i < k; i++) {
        initialSum += arr[i];
      }
      sumRef.current = initialSum;
      setCurrentSum(initialSum);
      setMaxSum(initialSum);
      setCurrentWindowStart(0);
      indexRef.current = k;

      // Start the interval.
      intervalRef.current = setInterval(() => {
        if (indexRef.current < arr.length) {
          // Simulate code highlighting using the correct indices for each language
          setHighlightLine(highlightIndices[selectedLang].windowSumUpdate);
          setTimeout(() => {
            setHighlightLine(highlightIndices[selectedLang].maxSumUpdate);
          }, 500);
          setTimeout(() => {
            setHighlightLine(null);
          }, 1000);

          // Update the window sum: slide by one position.
          sumRef.current =
            sumRef.current + arr[indexRef.current] - arr[indexRef.current - k];
          setCurrentSum(sumRef.current);
          setMaxSum((prev) => Math.max(prev, sumRef.current));
          // Update current window start index.
          setCurrentWindowStart(indexRef.current - k + 1);
          indexRef.current += 1;
        } else {
          clearInterval(intervalRef.current);
          setRunning(false);
        }
      }, speedOptions[speed]);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, selectedLang]);

  const updateArray = () => {
    const newArr = arrInput
      .split(",")
      .map((val) => parseInt(val.trim(), 10))
      .filter((num) => !isNaN(num));
    if (newArr.length >= k) {
      setArr(newArr);
    }
  };

  return (
    <div className="sliding-window-container">
      <div className="visualization-container">
        <h2>Maximum Sum of K-Size Subarray</h2>
        <p>
          Given an array and a window size <strong>k</strong>, find the{" "}
          <strong>maximum sum</strong> of any contiguous subarray of size{" "}
          <strong>k</strong>.
        </p>

        <div className="input-container">
          <input
            type="text"
            value={arrInput}
            onChange={(e) => setArrInput(e.target.value)}
            placeholder="Enter array (e.g. 1,3,2,6)"
            className="height-inputW1"
          />
          <input
            type="number"
            value={k}
            onChange={(e) => setK(parseInt(e.target.value, 10) || " ")}
            min=" "
            max={arr.length}
            placeholder="Size"
            className="height-inputW2"
          />
          <button onClick={updateArray} className="update-button">
            Update Array
          </button>
        </div>

        <div className="array-container">
          {arr.map((num, index) => (
            <motion.div
              key={index}
              className={`array-box ${
                index >= currentWindowStart && index < currentWindowStart + k
                  ? "window-active"
                  : ""
              }`}
            >
              {num}
            </motion.div>
          ))}
        </div>
        <p style={{ fontWeight: "bold" }}>Current Window Sum: {currentSum}</p>
        <p style={{ fontWeight: "bold" }}>Maximum Sum: {maxSum}</p>
      </div>

      <div className="code-container">
        <h2 className="codeSnippetH2">Sample Sliding Window Code</h2>
        <div className="snippet-buttonsLanguage">
          <button onClick={() => setSelectedLang("javascript")}>
            JavaScript
          </button>
          <button onClick={() => setSelectedLang("python")}>Python</button>
          <button onClick={() => setSelectedLang("java")}>Java</button>
          <button onClick={() => setSelectedLang("cpp")}>C++</button>
        </div>
        <hr
          style={{ backgroundColor: "#ece7e7", height: "1px", border: "none" }}
        />

        <pre>
          {sampleCodes[selectedLang].map((line, index) => (
            <div
              key={index}
              className={`code-line ${
                highlightLine === index ? "highlight" : ""
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
          <div className="snippet-buttonsW">
            <button onClick={handlePlay}>
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
            <button onClick={handleStop}>
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
          <div className="snippet-buttonsW">
            <button onClick={() => setSpeed("slow")}>0.5x</button>
            <button onClick={() => setSpeed("normal")}>1x</button>
            <button onClick={() => setSpeed("fast")}>2x</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlidingWindow;
