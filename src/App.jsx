import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(5);
  const [numberallowed, setNumberallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [passward, setPassward] = useState("");

 const passwardRef = useRef(null)

  const passwardGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "~!@#$%^&*()_+{}[]`*/-'?:;.,<>|";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassward(pass);
  }, [length, numberallowed, charallowed, setPassward]);

  const copypasswordToclipborad = useCallback(() => {
    passwardRef.current?.setSelectionRange(0, 999);
    window.navigator.clipborad.writeText(passward);
  }, [passward]);

  useEffect(() => {
    passwardGenerator();
  }, [length, numberallowed, charallowed, passwardGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={passward}
            className="outline-none w-full py-1 px-3"
            placeholder="Passward"
            readOnly
            ref={passwardRef}
          />

          <button
            onClick={copypasswordToclipborad}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberInput"
              onChange={() => {
                setNumberallowed((prev) => !prev);
              }}
            />

            <label htmlFor="numberInput">Numbers</label>
            <br />
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="CharacterInput"
              onChange={() => {
                setCharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="CharacterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
