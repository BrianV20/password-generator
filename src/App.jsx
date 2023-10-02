import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="app">
        <h1>Password Generator</h1>
        <p>Generate a random password</p>
        <section className="inputs">
          <form action="">
            <label htmlFor="length">Length: </label>
            <input type="number" name="length" id="length" min="1" max="100" />
            <label htmlFor="uppercase">Uppercase: </label>
            <input type="checkbox" name="uppercase" id="uppercase" />
            <label htmlFor="lowercase">Lowercase: </label>
            <input type="checkbox" name="lowercase" id="lowercase" />
            <label htmlFor="numbers">Numbers: </label>
            <input type="checkbox" name="numbers" id="numbers" />
            <label htmlFor="symbols">Symbols: </label>
            <input type="checkbox" name="symbols" id="symbols" />
            <label htmlFor="security">Security level*: </label>
            <input type="range" name="security" id="security" min="1" max="3" />
            // copilot show security level with a number above the range input
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
