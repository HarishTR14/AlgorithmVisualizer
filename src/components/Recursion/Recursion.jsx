import React, { useState, useEffect, useRef } from "react";
import "./Recursion.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
const sampleCodes = {
  javascript: [
    "function factorial(n) {",
    "  if (n <= 1) return 1;",
    "  return n * factorial(n - 1);",
    "}",
    "console.log(factorial(5));",
  ],
  python: [
    "def factorial(n):",
    "    if n <= 1:",
    "        return 1",
    "    return n * factorial(n - 1)",
    "print(factorial(5))",
  ],
  java: [
    "public class Factorial {",
    "    public static int factorial(int n) {",
    "        if (n <= 1) return 1;",
    "        return n * factorial(n - 1);",
    "    }",
    "    public static void main(String[] args) {",
    "        System.out.println(factorial(5));",
    "    }",
    "}",
  ],

  cpp: [
    "#include <iostream>",
    "using namespace std;",
    "int factorial(int n) {",
    "    if (n <= 1) return 1;",
    "    return n * factorial(n - 1);",
    "}",
    "int main() {",
    "    cout << factorial(5) << endl;",
    "    return 0;",
    "}",
  ],
};

// Generates an array of strings showing each recursive breakdown step.
const getRecursionSteps = (n) => {
  const steps = [];
  const helper = (num) => {
    if (num <= 1) {
      steps.push(`factorial(1) = 1`);
      return 1;
    }
    steps.push(`factorial(${num}) = ${num} * factorial(${num - 1})`);
    return num * helper(num - 1);
  };
  helper(n);
  return steps;
};
const speedOptions = {
  slow: 3000,
  normal: 2000,
  fast: 1000,
};
function Recursion() {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [inputValue, setInputValue] = useState(5);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  // No longer using highlightLine for code area—will highlight a block based on isRunning.
  const timerRef = useRef(null);

  // Start the recursion animation:
  const handleStart = () => {
    const n = parseInt(inputValue, 10);
    if (isNaN(n) || n < 1) return;
    const recursionSteps = getRecursionSteps(n);
    setSteps(recursionSteps);
    setCurrentStep(0);
    // Calculate final result using the recursive function.
    setResult(factorial(n));
    setIsRunning(true);
  };

  // Standard recursive factorial (for computing the final result)
  const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  // Pause the animation.
  const handlePause = () => {
    setIsRunning(false);
    clearTimeout(timerRef.current);
  };

  // Reset the animation.
  const handleReset = () => {
    setIsRunning(false);
    clearTimeout(timerRef.current);
    setCurrentStep(0);
    setSteps([]);
    setResult(null);
  };

  // Animate the recursion steps in the visualization area.
  useEffect(() => {
    if (isRunning && currentStep < steps.length) {
      timerRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length) {
      setIsRunning(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, currentStep, steps, speed]);

  return (
    <div className="recursion-container">
      <div className="visualization-container">
        <h2>Factorial of a number</h2>
        <p>
          Enter a number to see how <strong>factorial(n)</strong> is calculated
          recursively.
        </p>
        <div className="input-container">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min="1"
            className="height-inputW2"
          />
        </div>

        <div className="steps-container">
          <h3>Recursion Steps:</h3>
          <ul>
            {steps.map((step, index) => (
              <li
                key={index}
                className={index === currentStep - 1 ? "highlight" : ""}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>
        {result !== null && (
          <p style={{ fontWeight: "bold" }}>Result: {result}</p>
        )}
      </div>

      <div className="code-container">
        <h2 className="codeSnippetH2">Sample Recursion Code</h2>

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
          {sampleCodes[selectedLang].map((line, index) => {
            // Highlight the recursive block:
            let isBlockHighlighted = false;
            if (isRunning) {
              if (selectedLang === "javascript") {
                // For JavaScript, highlight lines 0 to 2.
                if (index >= 0 && index <= 2) {
                  isBlockHighlighted = true;
                }
              } else if (selectedLang === "python") {
                // For Python, highlight lines 0 to 3.
                if (index >= 0 && index <= 3) {
                  isBlockHighlighted = true;
                }
              } else if (selectedLang === "java") {
                // For Python, highlight lines 0 to 3.
                if (index >= 0 && index <= 3) {
                  isBlockHighlighted = true;
                }
              } else {
                {
                  // For Python, highlight lines 0 to 3.
                  if (index >= 2 && index <= 5) {
                    isBlockHighlighted = true;
                  }
                }
              }
            }
            return (
              <div
                key={index}
                className={`code-line ${
                  isBlockHighlighted ? "recursive-highlight" : ""
                }`}
              >
                {line}
              </div>
            );
          })}
        </pre>
        <hr
          style={{ backgroundColor: "#ece7e7", height: "1px", border: "none" }}
        />

        <div className="controls-speed-container">
          <h2 className="codeSnippetH3">Controls:</h2>
          <div className="snippet-buttonsR">
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
          <div className="snippet-buttonsR">
            <button onClick={() => setSpeed(speedOptions.slow)}>0.5x</button>
            <button onClick={() => setSpeed(speedOptions.normal)}>1x</button>
            <button onClick={() => setSpeed(speedOptions.fast)}>2x</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recursion;
