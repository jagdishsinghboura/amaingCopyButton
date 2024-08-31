
import { useCallback, useEffect, useRef, useState } from 'react'
import Democlip from "./DemoClip"
import './App.css'

function App() {

  const [length,setLength]=useState(0);
  const [numberAllowed,setNUmberAllowed]=useState(false)
  const [characterAllowed, setcharacterAllowed]=useState(false);
  const [password, setPassword]=useState("");
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)  str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*{}~`.,/"

    for (let i = 0; i <length; i++) {
     let char=Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char);
      
    }
    setPassword(pass)
    
  },[length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordClip=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,6);
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
    passwordGenerator();
  },[length, numberAllowed,characterAllowed, passwordGenerator])

  
  return (
    <>
   
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-3xl text-white m-4'>password generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password} className='outline-none w-full py-1 px-3  '  placeholder='password' readOnly ref={passwordRef}/>
      <button className='bg-blue-700 text-white px-3 py-0.5 shrink-0 outline-none ' onClick={copyPasswordClip}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={100}  value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label htmlFor="">length={length}</label>
        </div>
       
        <div className='flex items-center gap-x-1'>
          <input type="checkBox" defaultChecked={numberAllowed}  id='numberInput' onChange={()=>{
            setNUmberAllowed((prev)=>!prev)
          }}/>
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkBox" defaultChecked={numberAllowed}  id="characeterInput" onChange={()=>{
            setcharacterAllowed((prev)=>!prev)
          }}/>
          <label htmlFor="characeterInput">character</label>
        </div>
       
       
      </div>
    </div>
    </>
  )
}

export default App
