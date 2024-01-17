import React, { useState } from "react";

// A custom hook to generate a random number in a given range
const getRandomNumber = (min, max, currentRow) => {
  // Math.random() returns a number between 0 and 1
  // Math.floor() rounds down to the nearest integer
  // The formula below ensures that the number is within the range [min, max]
  let randomNumber = 0;
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  while(currentRow != null && currentRow.includes(randomNumber))
  {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if(currentRow != null)
  {
    currentRow.push(randomNumber);
  }
  
  return randomNumber;
};

// A functional component to display the lottery button and numbers
export const Lottery = () => {
  // Use the custom hook to generate lotteryRowsNumber button
  const [lotteryRowsNumber, setLotteryRowsNumber] = useState(1);
  // Use the custom hook to generate lottery rows list
  const [lotteryRows, setLotteryRows] = useState([]);

  // A function to handle the button click
  const handleClick = () => {
    setLotteryRows([]);
    for (let i = 0; i < lotteryRowsNumber; i++) {
      // Generate new numbers for each state
      let currentRow = [];
      let lotteryRow = {
        "number1": getRandomNumber(1, 37, currentRow),
        "number2": getRandomNumber(1, 37, currentRow),
        "number3": getRandomNumber(1, 37, currentRow),
        "number4": getRandomNumber(1, 37, currentRow),
        "number5": getRandomNumber(1, 37, currentRow),
        "strongNumber": getRandomNumber(1, 10, null)
      }
      
      setLotteryRows(prevLotteryRows => [...prevLotteryRows, lotteryRow]);
    }
  };

  const increaseInterval = () => {
    // Check that the lotteryRowsNumber is less than the maximum value, say 10
    if (lotteryRowsNumber < 10) {
      // Increase the lotteryRowsNumber by 1
      setLotteryRowsNumber(lotteryRowsNumber + 1);
    }
  };
  
  const decreaseInterval = () => {
    // Check that the lotteryRowsNumber is greater than the minimum value, say 1
    if (lotteryRowsNumber > 1) {
      // Decrease the lotteryRowsNumber by 1
      setLotteryRowsNumber(lotteryRowsNumber - 1);
    }
  };

  return (
    <div className="MainDiv">
      <div className="LotteryButtons">
        <button onClick={handleClick}>לוטו</button>
        <button onClick={increaseInterval}>+</button>
        <button onClick={decreaseInterval}>-</button>
        <span>{lotteryRowsNumber} :מספר השורות</span>
      </div>
      <div className="LotteryRows">
        <ul>
          {
            lotteryRows.map((lotteryRow, index) => (
              <li key={index}>{`${lotteryRow.number1} ${lotteryRow.number2} ${lotteryRow.number3} ${lotteryRow.number4} ${lotteryRow.number5} ${lotteryRow.strongNumber && '| המספר החזק: '} ${lotteryRow.strongNumber}`}
              </li>
            ))
          }
      </ul>
      </div>
    </div>
  );
};
