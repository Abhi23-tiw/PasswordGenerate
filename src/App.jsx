/*import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("olive");

  return (
    <div className='w-full h-screen duration-100'
      style={{ backgroundColor: color }}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounde-3xl'>
          <button onClick = {()=>setColor("red")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "red" }}>red</button>
          <button onClick = {()=>setColor("green")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "green" }}>green</button>
          <button onClick = {()=>setColor("blue")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "blue" }}>blue</button>
          <button onClick = {()=>setColor("lavender")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "lavender" }}>lavender</button>
          <button onClick = {()=>setColor("aqua")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "aqua" }}>aqua</button>
          <button onClick = {()=>setColor("white")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "white" }}>white</button>
          <button onClick = {()=>setColor("black")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "black" }}>black</button>
          <button onClick = {()=>setColor("orange")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "orange" }}>orange</button>
          <button onClick = {()=>setColor("pink")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "pink" }}>pink</button>
          <button onClick = {()=>setColor("violet")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ backgroundColor: "violet" }}>violet</button>
        </div>
      </div>
    </div>
  )
}

export default App
*/
import React, { useState, useCallback, useEffect,useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  // useRef hook 
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "./][,<)(*&^$%#@!";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);
    setCopied(false);

  }, [length, numberAllowed, charAllowed, setPassword]);
  const copyPasswordToClipboard = useCallback(()=>{

    window.navigator.clipboard.writeText(password)
    setCopied(true);  
    setTimeout(() => {
      setCopied(false);  
    }, 2000);
  },[password])
  
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-4 my-12 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center text-2xl font-semibold mb-4'>Password Generator</h1>
      <div className='flex items-center mb-6 bg-gray-700 rounded-lg overflow-hidden shadow-inner'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-2 px-4 text-gray-900 bg-gray-200'
          placeholder='password'
          readOnly
          ref = {passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`outline-none px-4 py-2 font-medium ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <label className='text-white font-medium'>Length: {length}</label>
          <input
            type='range'
            min={6}
            max={15}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-white font-medium flex items-center'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              className='mr-2'
              onChange={() => { setNumberAllowed((prev) => !prev); }}
            />
            Include Numbers
          </label>
          <label className='text-white font-medium flex items-center'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              className='mr-2'
              onChange={() => { setCharAllowed((prev) => !prev); }}
            />
            Include Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
