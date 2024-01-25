'use client';
import { useState, useEffect } from 'react';
import GameSquare from "./components/GameSquare";

const randomNumHitbox = () => {
  return Math.floor(Math.random() * (5 - 1)) + 1; // Pegando um número aleatório de 1 a 4
}

export default function Home() {
  const [emoji, setEmoji] = useState<string>("🔥");

  const [hitbox, setHitbox] = useState<any[]>(["-", 0]);

  const [startTime, setStartTime] = useState<number>(0);

  const [time, setTime] = useState<number>(0);

  const [timeAlive, setTimeAlive] = useState<number>(0);

  const [startVar, setStartVar] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    // if (emoji=="🔥"){
    //   setEmoji("👍");
    // }
    // else{
    //   setEmoji("🔥");
    // }
    // setEmoji(event.key);
    // setStartTime(Date.now());

    if((event.key=="Backspace")){ // Acaba o jogo
      setEmoji(event.key); // Sei q é sobrescrito só pra testar msm
      if(startVar){
        gameSwitch();
      }

    }
    else if(event.key=="Enter"){
      if(!startVar){
        gameSwitch();
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
        setHitbox([arrayTeclas[randomNumHitbox()-1], time+2000])
        setEmoji("⚠️");
      }
      else{
        console.log('????');
        gameSwitch();
      }
    }

  };

  const hitboxCheck = () => {
    if((hitbox[0]!="-") && (emoji!=hitbox[0]) && (time>hitbox[1]) ){
      gameSwitch();
      setHitbox(["-", 0])
      setEmoji("🔥");
      console.log('ERROU')
    }
    else if ((hitbox[0]!="-") && (emoji==hitbox[0]) && (time>hitbox[1])){
      setHitbox(["-", 0])
      setEmoji("🔥");
      console.log('ACERTOU!!!!!')  
    }

  };

  const gameSwitch = () => {
    if(startVar){
      setEmoji("🔥");
      setTimeAlive(time);
      setStartTime(0);
      setTime(0);
      setStartVar(false);
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

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(intervalId);
      clearInterval(intervalQTE);
      clearInterval(intervalHIT);
      
    };
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{timeAlive}</h1>
        <GameSquare mainSprite={emoji} startVar={startVar} hitbox={hitbox[0]}/>
        <button onClick={() => {gameSwitch()}}> -------- </button>
        <p>{time} / Hitbox: {hitbox[0]} / {hitbox[1]}</p>
        <p>{startVar.toString()}</p>
      </div>
    </main>
  );
}
