'use-client'
import { useState, useEffect } from 'react';
import React from 'react'

interface  infosMainPage {
  mainSprite : string,
  startVar : boolean,
  hitbox : string
}

const GameSquare : React.FC<infosMainPage> = ({mainSprite, startVar, hitbox}) => {
  const [divAtributes, setDivAtributes] = useState<string>("min-h-96 min-w-96 text-white bg-slate-700");

  useEffect(()=>{
    if(startVar){
      setDivAtributes("min-h-96 min-w-96 text-white bg-blue-950")
    }
    else{
      setDivAtributes("min-h-96 min-w-96 text-white bg-slate-700");
    }
  });

  return (
    <div className={divAtributes}>
      <div className = "h-screen flex items-start justify-center absolute inset-x-0">
        <h1 className="text-red-600 font-bold">{hitbox}</h1>
      </div>
      

      <div className="h-screen flex items-center justify-center absolute inset-x-0 bottom-0 inset-y-4">
        <p className="text-white">{mainSprite}</p>
        <p></p>
      </div>

    </div>
  )
}

export default GameSquare