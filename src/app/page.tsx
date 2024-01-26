'use client';
import { useState, useEffect } from 'react';
import GameSquare from "./components/GameSquare";

import Image from "next/image";


const randomNumHitbox = () => {
  return Math.floor(Math.random() * (5 - 1)) + 1; // Pegando um número aleatório de 1 a 4
}

export default function Home() {
  const [emoji, setEmoji] = useState<string>("🔥");

  const [hitbox, setHitbox] = useState<any[]>(["-", 0, false]); // hotkeyToDodge, timeLimitDodge, isFiring

  const [startTime, setStartTime] = useState<number>(0);

  const [time, setTime] = useState<number>(0);

  const [timeAlive, setTimeAlive] = useState<number>(0);

  const [longestTimeAlive, setLongestTimeAlive] = useState<number>(0);

  const [startVar, setStartVar] = useState<boolean>(false);

  const [cooldown, setCooldown] = useState<number>(2000);
  

  const handleKeyDown = (event: KeyboardEvent) => {

    if((event.key=="Backspace")){ // Acaba o jogo
      setEmoji(event.key); // Sei q é sobrescrito só pra testar msm
      if(startVar){
        gameSwitch();
      }

    }
    else if(event.key=="Enter"){
      if(!startVar){
        gameSwitch();
        setEmoji("🔥");
      }      
    }
    else{ // Continua
      setEmoji((event.key).toUpperCase());
    }

  };

  const updateTime = () => {
    if (startVar){
      const now = Date.now() 
      setTime(now - startTime);
    }
  };

  const quickTimeEvent = () => {
    if(startVar){
      if(emoji=="W"){
        console.log("W")
      }
      else if(emoji=="A"){
        console.log("A")
      }
      else if(emoji=="S"){
        console.log("S")
      }
      else if(emoji=="D"){
        console.log("D")
      }
      else if (emoji=="⚠️"){
        //ignorando
      }
      else if((emoji=="🔥")){
        console.log('oppanganganmastyle')
        const arrayTeclas = ['W','A','S','D']
        setHitbox([arrayTeclas[randomNumHitbox()-1], time+cooldown, false])
        setEmoji("⚠️");
      }
      else{
        console.log('????');
        gameSwitch();
      }
    }

  };

  const hitboxCheck = () => {
    // Sinalizando o tiro ou sla
    if(time>hitbox[1]-100 && time<hitbox[1]){
      setHitbox([hitbox[0], hitbox[1], true])
    }

    if((hitbox[0]!="-") && (emoji!=hitbox[0]) && (time>hitbox[1]) ){
      gameSwitch();
      setHitbox(["-", 0, false])
      setEmoji("🔥");
      setCooldown(2000);
      console.log('ERROU')
    }
    else if ((hitbox[0]!="-") && (emoji==hitbox[0]) && (time>hitbox[1])){
      setHitbox(["-", 0, false])
      setEmoji("🔥");
      console.log('ACERTOU!!!!!')
      if(cooldown>300){
        setCooldown(cooldown-50);
      }
      
    }

  };

  const gameSwitch = () => {
    if(startVar){
      setEmoji("🔥");
      setTimeAlive(time);
      setStartTime(0);
      setTime(0);
      setStartVar(false);

      setCooldown(2000);
      setHitbox(["-", 0, false]);
    }
    else{
      setStartTime(Date.now());
      setStartVar(true);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    const intervalId = setInterval(updateTime, 30);

    const intervalQTE = setInterval(quickTimeEvent, 30);

    const intervalHIT = setInterval(hitboxCheck, 30)

    if (timeAlive>longestTimeAlive){
      setLongestTimeAlive(timeAlive);
    };

    if ((hitbox[0]=="-") && (startVar==true)){
      setEmoji("🔥");
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(intervalId);
      clearInterval(intervalQTE);
      clearInterval(intervalHIT);
      
    };
  });
  return (
    <main className="flex h-full justify-center">
      <div className="p-24">
        <h1 className="text-center">Melhor tempo: {longestTimeAlive}</h1>
        <GameSquare mainSprite={emoji} startVar={startVar} hitbox={hitbox}/>
        <p className="text-center">Tempo: {time} / Próximo tiro: {hitbox[1]}</p>
        <p className="text-center">Rodando: {startVar.toString()}</p>

        <p>____________________________________________________________________</p>
        <h1 className="text-center">Controles: </h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="col-span-1 row-span-1">
            <button type="button" className="cursor-default placeholder:text-gray-900 border-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400"></button>
            <button type="button" className="cursor-default placeholder:text-gray-900 border-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400">W</button>
            <button type="button" className="cursor-default placeholder:text-gray-900 border-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400"></button>
          </div>
          <div className="col-span-1 row-span-1">
            <button type="button" className="cursor-default placeholder:text-gray-900 border-gray-800 hover:bg-red-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400">Backspace (←)</button>
            <button type="button" className="cursor-default placeholder:text-gray-900 border-gray-800 hover:bg-green-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400">Enter</button>
          </div>

          <div className="col-span-1 row-span-1">
            <button type="button" className="cursor-default placeholder:text-gray-900 border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400">A</button>
            <button type="button" className="cursor-default placeholder:text-gray-900 border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400">S</button>
            <button type="button" className="cursor-default placeholder:text-gray-900 border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400">D</button>
          </div>

        </div>


      </div>

      <div className="absolute p-10">
      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => {gameSwitch()}}> On/Off </button>

      </div>
    </main>
    
  );
}
