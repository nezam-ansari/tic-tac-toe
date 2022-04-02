import './App.css';
import React, { useEffect } from 'react';
import Confetti from 'react-confetti'
import { useState } from 'react';
import winnerSound from './winners.mp3';


function App() {
  const [scoreBoard, setScoreBoard] = useState(Array(9).fill(null));
  const [change, setChange] = useState(false);
  const [winOrLoss, setWinOrLoss] = useState('');
  const [winIndex, setWinIndex] = useState([]);

  //handleClick function set X or O in scoreBoard;
  function handleClick(index) {
    if (scoreBoard[index] === null && !winOrLoss) {
      scoreBoard[index] = change ? 'X' : 'O';
      setScoreBoard(scoreBoard);
      setChange(!change);
    }
  }

  //In every time check and update the chance of player
  useEffect(() => {
    winnerClick();
  }, [change])

  // To check winner 
  const winnerClick = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (scoreBoard[a] && scoreBoard[a] === scoreBoard[b] && scoreBoard[a] === scoreBoard[c]) {
        setWinOrLoss(`${scoreBoard[a]} WINNER`);
        setWinIndex(arr => [...arr, a, b, c])
      }
      if (!scoreBoard.includes(null) && !winOrLoss) {
        setWinOrLoss(`Match Draw`)
      }
    }
  }

  // To restart the game.
  const handleRestart = () => {
    setScoreBoard(Array(9).fill(null));
    setWinOrLoss('');
    setChange(!change);
    setWinIndex([])
  }

  // Generate random color
  function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
  }

  return (
    <div className="App">
      {winIndex.length > 0 && <div>
        <Confetti />
        <audio src={winnerSound} className="sound" autoplay="true" hidden="true" />
      </div>}
      {!!winOrLoss && <h1 className="heading">{winOrLoss}</h1>}
      <div className="grid-container">
        {scoreBoard.map((item, i) => {
          return <div className={`grid-item`} style={{ backgroundColor: winIndex.includes(i) ? generateRandomColor() : '' }}
            key={i} onClick={() => handleClick(i)}>
            {scoreBoard[i] ? item : ''}
          </div>
        })}
      </div>
      <button className="button" onClick={handleRestart}>RESTART</button>
    </div>
  );
}

export default App;
