import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symAllowed, setSymAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const copyPasswordRef = useRef(null)

  const copyPassword = useCallback(()=>{
    copyPasswordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  const generatePassword = useCallback(()=>{
    let pwd = ""
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) chars += "0123456789"
    if (symAllowed) chars += "!@#$%^&*-_+=~`"

    for (let i = 0; i < length; i++) {
      let char =  chars.charAt(Math.floor(Math.random() * chars.length))
      pwd += char
    }
    setPassword(pwd)
  }, [length, numberAllowed, symAllowed, setPassword])

  useEffect(()=>{
    generatePassword()
  }, [length, numberAllowed, symAllowed, generatePassword])

  return (
    <>
    <figure className="md:flex bg-slate-100 rounded-xl  p-8 dark:bg-slate-800">
      <div className="pt-6 w-full flex flex-col justify-center items-center space-y-4">
        <h1 className='text-white text-3xl'>Password Generator</h1>
        <figcaption className="font-medium">
          <div className="flex items-center text-sky-500 dark:text-sky-400 mb-5">
            <input type="text" 
            id="passowrd" 
            value={password}
            className='rounded-lg text-2xl py-2 px-2'
            ref={copyPasswordRef}
             />
            <button type="button"
              onClick={copyPassword}
             className='ms-3 bg-blue-500 text-white py-2 px-3 rounded'>Copy</button>
          </div>

          <div className="flex justify-around text-white">
            <div>
              <input type="range"
                id='length'
                min={6}
                max={100}
                defaultValue={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label className='mx-2' htmlFor="length">Length: {length}</label>
            </div>

            <div>
              <input type="checkbox"
               id="numbers"
               defaultChecked={numberAllowed}
               onChange={() => setNumberAllowed(prev => !prev)}
               />
              <label className='mx-2' htmlFor="numbers">Numbers</label>
            </div>

            <div>
              <input type="checkbox"
               id="symbols"
               defaultChecked={symAllowed}
               onChange={() => setSymAllowed(prev => !prev)}
               />
              <label className='mx-2' htmlFor="symbols">Symbols</label>
            </div>
          </div>
        </figcaption>
      </div>
    </figure>
    </>
  )
}

export default App
