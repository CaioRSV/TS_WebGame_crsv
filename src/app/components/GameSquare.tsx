'use-client'
import { useState, useEffect } from 'react';
import React from 'react'

import Image from "next/image";

interface  infosMainPage {
  mainSprite : string,
  startVar : boolean,
  hitbox : any[]
}

const divStyleBG = {
  backgroundImage: "url('/utils_images/scenario_Image.png')"
};

const GameSquare : React.FC<infosMainPage> = ({mainSprite, startVar, hitbox}) => {
  const [divAtributes, setDivAtributes] = useState<string>("min-h-96 min-w-96 text-white bg-slate-700 grayscale");

  const [shootSign, setShootSign] = useState<string>("text-slate-200 font-bold")

  const [pathMC, setPathMC] = useState<string>("/utils_images/mc_StandBy.png")

  const [pathGoon, setPathGoon] = useState<string>("/utils_images/goon_StandBy.png")

  useEffect(()=>{
    if(startVar){
      setDivAtributes("min-h-96 min-w-96 text-white bg-blue-950")
    }
    else{
      setDivAtributes("min-h-96 min-w-96 text-white bg-slate-500 grayscale");
    }
    //---  
    if(hitbox[2]){
      setShootSign("text-red-600 font-bold");
    }
    else{
      setShootSign("text-slate-200 font-bold");
    }
    //-- McIMG
    if(mainSprite=="🔥"){
      setPathMC("/utils_images/mc_StandBy.png")
    }
    else if (mainSprite=="W"){
      setPathMC("/utils_images/mc_DodgeW.png")
    }
    else if (mainSprite=="A"){
      setPathMC("/utils_images/mc_DodgeA.png")
    }
    else if (mainSprite=="S"){
      setPathMC("/utils_images/mc_DodgeS.png")
    }
    else if (mainSprite=="D"){
      setPathMC("/utils_images/mc_DodgeD.png")
    }

    //-- GoonIMG
    if (hitbox[2]){
      setPathGoon("/utils_images/goon_Shoot.png");
    }
    else{
      setPathGoon("/utils_images/goon_StandBy.png");
    }
    
  });

  return (
    <div className={divAtributes} style = {divStyleBG}>
      <div className = "h-full w-full justify-center flex text-3xl">
        <h1 className={shootSign}>{hitbox[0]}</h1>
      </div>
      

      <div className="h-full w-full grid grid-cols-2 gap-4 mt-40">
      {/* flex items-center justify-center inset-x-0 bottom-0 inset-y-4 */}
        <div className="col-span-1">
          <Image
                src={pathMC}
                width={180}
                height={180}
                alt="sheesh"
            />

        </div>

        <div className="col-span-1">
          <Image
                src={pathGoon}
                width={180}
                height={180}
                alt="sheesh"
            />
        </div>

      </div> 

    </div>
  )
}

export default GameSquare