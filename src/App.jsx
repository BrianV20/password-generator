import { useState, useEffect } from "react";
import "./App.css";
import { InputField } from "./components/InputField";

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
    if (
      !configs.uppercase &&
      !configs.lowercase &&
      !configs.numbers &&
      !configs.symbols
    ) {
      setConfigs({ ...configs, [lastChecked]: true });
    }
    passwordStrength();
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
    // navigator.clipboard.writeText(password);
    let temp = "";
    for (let i = 0; i < password.length; i++) {
      temp += "*";
    }

    if (password === temp) {
      //aca entraria si la contra esta oculta
      const textarea = document.createElement("textarea");
      textarea.value = previousPassword;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
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
    passwordStrength();
    // changeIcon();
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

    changeIcon();
  };

  const changeIcon = () => {
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
            <InputField
              type="checkbox"
              name="uppercase"
              checked={configs.uppercase}
              onChange={() => {
                setConfigs({ ...configs, uppercase: !configs.uppercase });
                setLastChecked("uppercase");
              }}
              text="A-Z"
            />
          </div>

          <div>
            <InputField
              type="checkbox"
              name="lowercase"
              checked={configs.lowercase}
              onChange={() => {
                setConfigs({ ...configs, lowercase: !configs.lowercase });
                setLastChecked("lowercase");
              }}
              text="a-z"
            />
          </div>

          <div>
            <InputField
              type="checkbox"
              name="numbers"
              checked={configs.numbers}
              onChange={() => {
                setConfigs({ ...configs, numbers: !configs.numbers });
                setLastChecked("numbers");
              }}
              text="0-9"
            />
          </div>

          <div>
            <InputField
              type="checkbox"
              name="symbols"
              checked={configs.symbols}
              onChange={() => {
                setConfigs({ ...configs, symbols: !configs.symbols });
                setLastChecked("symbols");
              }}
              text="!@#$%^&*"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
