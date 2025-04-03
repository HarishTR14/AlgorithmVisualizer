import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import TwoPointer from "./components/Twopointer/TwoPointer";
import SlidingWindow from "./components/SlidingWindow/SlidingWindow";
import Recursion from "./components/Recursion/Recursion";
import DynamicProgramming from "./components/dynamicProgramming/DynamicProgramming";
import "./App.css"; // External CSS for styling

function App() {
  const [selectedAlgo, setSelectedAlgo] = useState("");

  const renderComponent = () => {
    switch (selectedAlgo) {
      case "twoPointer":
        return <TwoPointer />;
      case "slidingWindow":
        return <SlidingWindow />;
      case "recursion":
        return <Recursion />;
      case "dp":
        return <DynamicProgramming />;
      default:
        return (
          <div>
            <br></br>
            <div>
              Please select an algorithm category from the options above.
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <h1>Algorithm Visualizer</h1>
      <AnimatedMenu setSelectedAlgo={setSelectedAlgo} />
      <div className="visualization">{renderComponent()}</div>
    </div>
  );
}

const AnimatedMenu = ({ setSelectedAlgo }) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const menuRef = useRef(null);

  return (
    <div
      className="menu"
      ref={menuRef}
      onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))}
    >
      <MenuButton
        setPosition={setPosition}
        setSelectedAlgo={setSelectedAlgo}
        algo="twoPointer"
      >
        Two Pointer
      </MenuButton>
      <MenuButton
        setPosition={setPosition}
        setSelectedAlgo={setSelectedAlgo}
        algo="slidingWindow"
      >
        Sliding Window
      </MenuButton>
      <MenuButton
        setPosition={setPosition}
        setSelectedAlgo={setSelectedAlgo}
        algo="recursion"
      >
        Recursion
      </MenuButton>
      <MenuButton
        setPosition={setPosition}
        setSelectedAlgo={setSelectedAlgo}
        algo="dp"
      >
        Dynamic Programming
      </MenuButton>
      <Cursor position={position} />
    </div>
  );
};

const MenuButton = ({ children, setPosition, setSelectedAlgo, algo }) => {
  const ref = useRef(null);

  return (
    <button
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width, left } = ref.current.getBoundingClientRect();
        const parentLeft = ref.current.parentNode.getBoundingClientRect().left;
        setPosition({ left: left - parentLeft, width, opacity: 1 });
      }}
      onClick={() => setSelectedAlgo(algo)}
      className="menu-button"
    >
      {children}
    </button>
  );
};

const Cursor = ({ position }) => {
  return <motion.div className="cursor" animate={position} />;
};

export default App;
