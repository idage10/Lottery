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
    <div className="mainDiv">
      <div className="lotteryButtons">
        <button onClick={handleClick}>לוטו</button>
        <button onClick={increaseInterval}>+</button>
        <button onClick={decreaseInterval}>-</button>
        <span className="rowsNumber">מספר השורות: {lotteryRowsNumber}</span>
      </div>
      <div className="lotteryRows">
        {lotteryRows.length > 0 ? ( // Check if the lotteryRows array is not empty
          <table>
            <tr>
              <th className="tdRowNumber">שורה</th>
              <th className="tdStrongNumber">מספר חזק</th>
              <th className="tdLotteryNumbers">מספרים</th>
            </tr>
              {
                lotteryRows.map((lotteryRow, index) => (
                  <tr>
                    <td className="tdRowNumber">{index + 1}</td>
                    <td className="tdStrongNumber">{lotteryRow.strongNumber}</td>
                    <td className="tdLotteryNumbers">
                      <span>{lotteryRow.number1}</span>
                      <span>{lotteryRow.number2}</span>
                      <span>{lotteryRow.number3}</span>
                      <span>{lotteryRow.number4}</span>
                      <span>{lotteryRow.number5}</span>
                    </td>
                  </tr>
                ))
              }
          </table>
        ) : ( // If the lotteryRows array is empty, render nothing
          null
        )}
      </div>
    </div>
  );
};
