import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [range, setRange] = useState(8);
  const [numberRange, setNumberRange] = useState(0);
  const [score, setScore] = useState("weak");
  const [configs, setConfigs] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [lastChecked, setLastChecked] = useState("uppercase");
  const [password, setPassword] = useState(null);
  const [previousPassword, setPreviousPassword] = useState(null);
  const [eyeClass, setEyeClass] = useState("fa-solid fa-eye");

  useEffect(() => {
    setPassword(generatePassword());
    passwordStrength();
    if (
      !configs.uppercase &&
      !configs.lowercase &&
      !configs.numbers &&
      !configs.symbols
    ) {
      setConfigs({ ...configs, [lastChecked]: true });
    }
  }, [configs, range]);

  const handleRangeOnChange = (e) => {
    setRange(e.target.value);
    setNumberRange(e.target.value);
  };

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
    const numbers = "012345678901234567890123456789";
    const symbols = "!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*";

    let password = "";

    if (configs.uppercase) {
      password += uppercase;
    }

    if (configs.lowercase) {
      password += lowercase;
    }

    if (configs.numbers) {
      password += numbers;
    }

    if (configs.symbols) {
      password += symbols;
    }

    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .slice(0, range)
      .join("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const passwordStrength = () => {
    if (password === null) return;
    if (password.length < 10) {
      setScore("weak");
    } else if (password.length >= 10 && password.length < 20) {
      setScore("medium");
    } else {
      setScore("strong");
    }
  };

  const regeneratePassword = () => {
    setPassword(generatePassword());
  };

  const hidePassword = () => {
    let encryptedPassword = "";
    for (let i = 0; i < password.length; i++) {
      encryptedPassword += "*";
    }

    if (password === encryptedPassword) {
      setPassword(previousPassword);
    } else {
      setPreviousPassword(password);
      setPassword(encryptedPassword);
    }

    if (eyeClass === "fa-solid fa-eye") {
      setEyeClass("fa-solid fa-eye-slash");
    } else {
      setEyeClass("fa-solid fa-eye");
    }
  };

  return (
    <main className="app">
      <h1>Password Generator</h1>
      <h3>
        Your password's score: <span className={score}>{score}</span>
      </h3>

      <section className="show">
        <p id="password">
          {password} <i className={eyeClass} onClick={hidePassword}></i>
        </p>
        <div className="functionalityButtons">
          <button id="copyBtn" type="button" onClick={copyToClipboard}>
            <i className="far fa-clipboard"></i> Copy to Clipboard
          </button>
          <button id="regenerateBtn" type="button" onClick={regeneratePassword}>
            <i className="fa-solid fa-rotate"></i> Regenerate
          </button>
        </div>
      </section>

      <section className="configurations">
        <h3>Addditional options</h3>
        <form action="">
          <p id="rangeValue">Characters: {range}</p>

          <label htmlFor="length"></label>
          <input
            type="range"
            name="length"
            id="length"
            min="8"
            max="30"
            value={range}
            onChange={handleRangeOnChange}
          />

          <div className="inputs">
            <div>
              <input
                type="checkbox"
                name="uppercase"
                id="uppercase"
                checked={configs.uppercase}
                onChange={() => {
                  setConfigs({ ...configs, uppercase: !configs.uppercase });
                  setLastChecked("uppercase");
                }}
              />
              <label htmlFor="uppercase">A-Z </label>
            </div>

            <div>
              <input
                type="checkbox"
                name="lowercase"
                id="lowercase"
                checked={configs.lowercase}
                onChange={() => {
                  setConfigs({ ...configs, lowercase: !configs.lowercase });
                  setLastChecked("lowercase");
                }}
              />
              <label htmlFor="lowercase">a-z </label>
            </div>

            <div>
              <input
                type="checkbox"
                name="numbers"
                id="numbers"
                checked={configs.numbers}
                onChange={() => {
                  setConfigs({ ...configs, numbers: !configs.numbers });
                  setLastChecked("numbers");
                }}
              />
              <label htmlFor="numbers">0-9 </label>
            </div>

            <div>
              <input
                type="checkbox"
                name="symbols"
                id="symbols"
                checked={configs.symbols}
                onChange={() => {
                  setConfigs({ ...configs, symbols: !configs.symbols });
                  setLastChecked("symbols");
                }}
              />
              <label htmlFor="symbols">!@#$%^&* </label>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default App;
