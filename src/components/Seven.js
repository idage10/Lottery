import React, { useState } from "react";
import "./Seven.css";

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
export const Seven = () => {
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
        number1: getRandomNumber(1, 70, currentRow),
        number2: getRandomNumber(1, 70, currentRow),
        number3: getRandomNumber(1, 70, currentRow),
        number4: getRandomNumber(1, 70, currentRow),
        number5: getRandomNumber(1, 70, currentRow),
        number6: getRandomNumber(1, 70, currentRow),
        number7: getRandomNumber(1, 70, currentRow)
      }
      
      setLotteryRows(prevLotteryRows => [...prevLotteryRows, lotteryRow]);
    }
  };

  const increaseRowsNumber = () => {
    // Check that the lotteryRowsNumber is less than the maximum value, say 10
    if (lotteryRowsNumber < 3) {
      // Increase the lotteryRowsNumber by 1
      setLotteryRowsNumber(lotteryRowsNumber + 1);
    }
  };
  
  const decreaseRowsNumber = () => {
    // Check that the lotteryRowsNumber is greater than the minimum value, say 1
    if (lotteryRowsNumber > 1) {
      // Decrease the lotteryRowsNumber by 1
      setLotteryRowsNumber(lotteryRowsNumber - 1);
    }
  };

  const resetRowsNumber = () => {
    setLotteryRowsNumber(1);
    setLotteryRows([]);
  };

  return (
    <div className="mainLotteryDiv">
      <div className="headlineTitle"><span className="lotteryTitleStyle lotterySevenTitle">הגרלת 777</span><span className="rowsNumber"> - שורות: {lotteryRowsNumber}</span></div>
      <div className="lotteryButtons">
        <button onClick={handleClick}>הגרל מספרים</button>
        <button onClick={increaseRowsNumber}>+</button>
        <button onClick={decreaseRowsNumber}>-</button>
        <button onClick={resetRowsNumber}>אפס</button>
      </div>
      <div className="lotteryRows">
        {
          lotteryRows.length > 0 ? ( // Check if the lotteryRows array is not empty
            <table>
              <thead>
                <tr>
                  <th className="tdRowNumber">שורה</th>
                  <th className="tdLotterySevenNumbers">מספרים שהוגרלו</th>
                </tr>
              </thead>
              <tbody>
                {
                  lotteryRows.map((lotteryRow, index) => (
                    <tr key={index}>
                      <td className="tdRowNumber">{index + 1}</td>
                      <td className="tdLotterySevenNumbers">
                        <span className="lotteryNumbersCircle lotterySevenNumbersCircle">{lotteryRow.number1}</span>
                        <span className="lotteryNumbersCircle lotterySevenNumbersCircle">{lotteryRow.number2}</span>
                        <span className="lotteryNumbersCircle lotterySevenNumbersCircle">{lotteryRow.number3}</span>
                        <span className="lotteryNumbersCircle lotterySevenNumbersCircle">{lotteryRow.number4}</span>
                        <span className="lotteryNumbersCircle lotterySevenNumbersCircle">{lotteryRow.number5}</span>
                        <span className="lotteryNumbersCircle lotterySevenNumbersCircle">{lotteryRow.number6}</span>
                        <span className="lotteryNumbersCircle lotterySevenNumbersCircle">{lotteryRow.number7}</span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : ( // If the lotteryRows array is empty, render nothing
            null
          )}
      </div>
    </div>
  );
};
