import { useState } from "react";
import "./App.css";

//agregar algo que te diga lo fuerte que es la contraseña (basandose solo en la longitud de la contraseña).

function App() {
  const [range, setRange] = useState(15);
  const [numberRange, setNumberRange] = useState(0);
  const [score, setScore] = useState("weak");

  const handleRangeOnChange = (e) => {
    setRange(e.target.value);
    setNumberRange(e.target.value);
  };

  return (
    <main className="app">
      <h1>Password Generator</h1>
      {/* <p>--Generate a random password--</p> */}
      <p>Your password's score: {score}</p>
      <div className="password"></div>

      <section className="show">
        {/* <h2>Generated Password</h2> */}
        {/* Your password will appear here */}
        <p id="password">aKANJ789ASMD0-,DFI8</p>
        <div className="functionalityButtons">
          <button id="copyBtn">
            <i className="far fa-clipboard"></i> Copy to Clipboard
          </button>
          <button id="regenerateBtn">
            <i className="fa-solid fa-rotate"></i> Regenerate
          </button>
        </div>
      </section>

      <section className="inputs">
        <form action="">
          <input type="checkbox" name="uppercase" id="uppercase" />
          <label htmlFor="uppercase">A-Z </label>

          <input type="checkbox" name="lowercase" id="lowercase" />
          <label htmlFor="lowercase">a-z </label>

          <input type="checkbox" name="numbers" id="numbers" />
          <label htmlFor="numbers">0-9 </label>

          <input type="checkbox" name="symbols" id="symbols" />
          <label htmlFor="symbols">!@#$%^&* </label>

          <p id="rangeValue">Characters: {range}</p>

          <label htmlFor="length"></label>
          <input
            type="range"
            name="length"
            id="length"
            min="8"
            max="50"
            value={range}
            onChange={handleRangeOnChange}
          />
        </form>
      </section>
    </main>
  );
}

export default App;
