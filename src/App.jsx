import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [len, setlen] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [pass, setpass] = useState("");

  // useRef hook
  const passref = useRef(null);

  // Generate password
  const passGenerator = useCallback(() => {
    let pass = "";

    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallowed) {
      str += "0123456789";
    }

    if (charallowed) {
      str += "!@#$%^&*(){}[]_+-=~`";
    }

    for (let i = 0; i < len; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpass(pass);
  }, [len, numallowed, charallowed]);

  // Copy password
  const copyPasswordToClipboard = useCallback(() => {
    passref.current?.select();

    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  // Generate password whenever settings change
  useEffect(() => {
    passGenerator();
  }, [len, numallowed, charallowed, passGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700">

      <h1 className="text-white text-center pt-4 pb-4 text-3xl">
        Password Generator
      </h1>

      <div className="bg-white text-gray-700 flex shadow rounded-lg overflow-hidden mb-4">

        <input
          type="text"
          value={pass}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passref}
        />

        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer"
        >
          Copy
        </button>

      </div>

      <div className="flex text-sm gap-x-2 pb-4">

        <div className="flex items-center gap-x-2 pr-7">

          <input
            type="range"
            min={6}
            max={100}
            value={len}
            className="cursor-pointer accent-orange-400"
            onChange={(e) => {
              setlen(e.target.value);
            }}
          />

          <label>Length: {len}</label>

        </div>

        <div className="flex items-center gap-x-1 pr-3">

          <input
            type="checkbox"
            checked={numallowed}
            id="numberInput"
            onChange={() => {
              setnumallowed((prev) => !prev);
            }}
          />

          <label htmlFor="numberInput">
            Numbers
          </label>

        </div>

        <div className="flex items-center gap-x-1">

          <input
            type="checkbox"
            checked={charallowed}
            id="charInput"
            onChange={() => {
              setcharallowed((prev) => !prev);
            }}
          />

          <label htmlFor="charInput">
            Characters
          </label>

        </div>

      </div>

    </div>
  );
};

export default App;