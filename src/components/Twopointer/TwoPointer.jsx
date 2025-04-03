import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./TwoPointer.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
const sampleCodes = {
  javascript: [
    "let left = 0;",
    "let right = height.length - 1;",
    "let maxArea = 0;",
    "while (left < right) {",
    "    const area = Math.min(height[left], height[right]) * (right - left);",
    "    maxArea = Math.max(maxArea, area);",
    "    if (height[left] < height[right]) {",
    "        left++;",
    "    } else {",
    "        right--;",
    "    }",
    "}",
    "console.log('Maximum area:', maxArea);",
  ],
  python: [
    "left, right = 0, len(height) - 1",
    "max_area = 0",
    "while left < right:",
    "    area = min(height[left], height[right]) * (right - left)",
    "    max_area = max(max_area, area)",
    "    if height[left] < height[right]:",
    "        left += 1",
    "    else:",
    "        right -= 1",
    "print('Maximum area:', max_area)",
  ],
  java: [
    "class Solution {",
    "    public int maxArea(int[] height) {",
    "        int left = 0, right = height.length - 1, maxArea = 0;",
    "        while (left < right) {",
    "            int area = Math.min(height[left], height[right]) * (right - left);",
    "            maxArea = Math.max(maxArea, area);",
    "            if (height[left] < height[right]) {",
    "                left++;",
    "            } else {",
    "                right--;",
    "            }",
    "        }",
    "        return maxArea;",
    "    }",
    "}",
  ],
  cpp: [
    "using namespace std;",
    "int maxArea(vector<int>& height) {",
    "    int left = 0, right = height.size() - 1, maxArea = 0;",
    "    while (left < right) {",
    "        int area = min(height[left], height[right]) * (right - left);",
    "        maxArea = max(maxArea, area);",
    "        if (height[left] < height[right]) {",
    "            left++;",
    "        } else {",
    "            right--;",
    "        }",
    "    }",
    "    return maxArea;",
    "}",
    "int main() {",
    "    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};",
    '    cout << "Maximum area: " << maxArea(height) << endl;',
    "    return 0;",
    "}",
  ],
};

function TwoPointer() {
  const [isLocked, setIsLocked] = useState(false);
  const [heightInput, setHeightInput] = useState("1,8,6,2,5,4,8,3,7");
  const [height, setHeight] = useState([1, 8, 6, 2, 5, 4, 8, 3, 7]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(height.length - 1);
  const [maxArea, setMaxArea] = useState(0);
  const [highlightLine, setHighlightLine] = useState(null);
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [speed, setSpeed] = useState("normal");
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const speedOptions = {
    slow: 1200,
    normal: 800,
    fast: 400,
  };
  useEffect(() => {
    setLeft(0);
    setRight(height.length - 1);
    setMaxArea(0);
    setHighlightLine(null);
    setRunning(false);
    clearInterval(intervalId);
  }, [height, selectedLang, speed]);

  useEffect(() => {
    if (!running || left >= right) return;

    const interval = setInterval(() => {
      if (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        setMaxArea((prev) => Math.max(prev, area));

        setHighlightLine(5);
        setTimeout(() => {
          setHighlightLine(6);
          setTimeout(() => {
            setHighlightLine(7);
            setTimeout(() => {
              if (height[left] < height[right]) {
                setHighlightLine(8);
                setLeft((prev) => prev + 1);
              } else {
                setHighlightLine(10);
                setRight((prev) => prev - 1);
              }
              setTimeout(() => setHighlightLine(null), 300);
            }, speedOptions[speed] / 4);
          }, speedOptions[speed] / 4);
        }, speedOptions[speed] / 4);
      } else {
        clearInterval(interval);
      }
    }, speedOptions[speed]);

    setIntervalId(interval);

    return () => clearInterval(interval);
  }, [left, right, height, selectedLang, speed, running]);

  const handleHeightChange = (e) => {
    setHeightInput(e.target.value);
  };

  const updateHeightArray = () => {
    const newHeight = heightInput
      .split(",")
      .map((val) => parseInt(val.trim(), 10))
      .filter((num) => !isNaN(num));
    if (newHeight.length > 1) {
      setHeight(newHeight);
    }
  };

  const handlePlay = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
    clearInterval(intervalId);
  };

  const handleStop = () => {
    setRunning(false);
    clearInterval(intervalId);
    setLeft(0);
    setRight(height.length - 1);
    setMaxArea(0);
    setHighlightLine(null);
  };

  return (
    <div className="two-pointer-container">
      <div className="visualization-container">
        <h2>Container With Most Water</h2>
        <p>
          You are given an array where each element represents the height of a
          vertical line. Your task is to find two lines that form a container
          holding the **maximum water area**.
        </p>
        <p>
          The area is determined by the **shorter line** and the **distance**
          between the two lines. Try different pairs to find the largest
          possible area.
        </p>

        <div className="input-container">
          <input
            type="text"
            value={heightInput}
            onChange={handleHeightChange}
            placeholder="Enter heights (e.g. 1,8,6,2,5)"
            className="height-input"
          />
          <button onClick={updateHeightArray} className="update-button">
            Update Heights
          </button>
        </div>
        <div className="array-container">
          {height.map((h, index) => (
            <div key={index} className="array-box">
              {h}
              {index === left && (
                <motion.div
                  className="pointer left-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  L
                </motion.div>
              )}
              {index === right && (
                <motion.div
                  className="pointer right-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  R
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontWeight: "bold" }}>Current Maximum Area: {maxArea}</p>
      </div>

      <div className="code-container">
        <h2 className="codeSnippetH2">Sample Two Pointer Code</h2>
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
                highlightLine === index + 1 ? "highlight" : ""
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
          <div className="snippet-buttons">
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
          <div className="snippet-buttons">
            <button onClick={() => setSpeed("slow")}>0.5x</button>
            <button onClick={() => setSpeed("normal")}>1x</button>
            <button onClick={() => setSpeed("fast")}>2x</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoPointer;
