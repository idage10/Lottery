import React, { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import "./LotteryLotto.css";

// a custom hook to generate a random number in a given range
const getRandomNumber = (min, max, currentRow) => {
  // Math.random() returns a number between 0 and 1
  // Math.floor() rounds down to the nearest integer
  // the formula below ensures that the number is within the range [min, max]
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

// a functional component to display the lottery button and numbers
export const LotteryLotto = (props) => {
  const { setClickOnMobileMainPage } = props;
  // use the custom hook to generate lotteryRowsNumber button
  const [lotteryRowsNumber, setLotteryRowsNumber] = useState(1);
  // use the custom hook to generate lottery rows list
  const [lotteryRows, setLotteryRows] = useState([]);
  // use the hook to check the screen size
  const isMobileScreen = useMediaQuery("(max-width: 480px)");
  // sessionStorage key name
  const sessionStorageKeyName = "lastLotteryDataLotto";

  React.useEffect(() => {
    // define an async function
    const handleSessionStorageData = async () => {
      const lastLotteryDataJSON = sessionStorage.getItem(sessionStorageKeyName);
  
      if (lastLotteryDataJSON != null)
      {
        const lastLotteryData = JSON.parse(lastLotteryDataJSON);
        setLotteryRows(lastLotteryData.lotteryRows);
        setLotteryRowsNumber(lastLotteryData.rowsNumber);
      }
    }
  
    // call the async function
    handleSessionStorageData();
  }, []);

  // an async function that clears the sessionStorage
  const clearSessionStorageByKeyName = async () => {
    // try to clear the sessionStorage
    try {
      sessionStorage.removeItem(sessionStorageKeyName);
    } catch (error) {
      // throw the error
      throw error;
    }
  }

  // a function to handle the button click
  const handleClick = () => {
    let lotteryRowsData = [];
    // reset the lotto state rows data
    setLotteryRows([]);

    for (let i = 0; i < lotteryRowsNumber; i++) {
      // generate new numbers for each state
      let currentRow = []; 

      let lotteryRow = {
        number1: getRandomNumber(1, 37, currentRow),
        number2: getRandomNumber(1, 37, currentRow),
        number3: getRandomNumber(1, 37, currentRow),
        number4: getRandomNumber(1, 37, currentRow),
        number5: getRandomNumber(1, 37, currentRow),
        number6: getRandomNumber(1, 37, currentRow),
        strongNumber: getRandomNumber(1, 7, null)
      }
      
      lotteryRowsData.push(lotteryRow);
    }

    setLotteryRows(lotteryRowsData);
    // save the table data and lottery rows number into session storage
    const lastLotteryData = {
      lotteryRows: lotteryRowsData,
      rowsNumber: lotteryRowsNumber
    };
    const lastLotteryDataJSON = JSON.stringify(lastLotteryData); // convert the object into a JSON string
    sessionStorage.setItem(sessionStorageKeyName, lastLotteryDataJSON); // store the JSON string under the key "lastLottoTableData"
  };

  const increaseRowsNumber = () => {
    // check that the lotteryRowsNumber is less than the maximum value, say 10
    if (lotteryRowsNumber < 14) {
      // increase the lotteryRowsNumber by 1
      setLotteryRowsNumber(lotteryRowsNumber + 1);
    }
  };
  
  const decreaseRowsNumber = () => {
    // check that the lotteryRowsNumber is greater than the minimum value, say 1
    if (lotteryRowsNumber > 1) {
      // decrease the lotteryRowsNumber by 1
      setLotteryRowsNumber(lotteryRowsNumber - 1);
    }
  };

  const resetRowsNumber = async () => {
    setLotteryRowsNumber(1);
    setLotteryRows([]);
    // clear the session storage data of the current component
    await clearSessionStorageByKeyName();
  };

  const onClickMainLotteryDiv = () => {
    if (isMobileScreen) {
      setClickOnMobileMainPage(true);
    }
  }

  return (
    <div className="mainLotteryDiv" onClick={onClickMainLotteryDiv}>
      <div className="mainPageTitle">
        <span className="lotteryTitleStyle lotteryTitle">
          <img className="mainPageTitleLogoLotto" src={`${process.env.PUBLIC_URL}/images/lotto-logo.png`} alt="לוגו לוטו"></img>
        </span>
        <span className="rowsNumber"> - שורות: {lotteryRowsNumber}</span>
      </div>
      <div className="lotteryButtons">
        <button onClick={handleClick}>הגרל מספרים</button>
        <button onClick={increaseRowsNumber}>+</button>
        <button onClick={decreaseRowsNumber}>-</button>
        <button onClick={resetRowsNumber}>איפוס</button>
      </div>
      <div className="lotteryRows">
        {
          lotteryRows.length > 0 ? ( // check if the lotteryRows array is not empty
            <table className="lotteryTable">
              <thead>
                <tr>
                  <th className="tdLottoRowNumber">שורה</th>
                  <th className="tdStrongNumber">המספר החזק</th>
                  <th className="tdLotteryNumbers">מספרים שהוגרלו</th>
                </tr>
              </thead>
              <tbody>
                  {
                    lotteryRows.map((lotteryRow, index) => (
                      <tr key={index}>
                        <td className="tdLottoRowNumber">{index + 1}</td>
                        <td className="tdStrongNumber"><span className="strongNumberCircle">{lotteryRow.strongNumber}</span></td>
                        <td className="tdLotteryNumbers">
                          <span className="lotteryNumbersCircle">{lotteryRow.number1}</span>
                          <span className="lotteryNumbersCircle">{lotteryRow.number2}</span>
                          <span className="lotteryNumbersCircle">{lotteryRow.number3}</span>
                          <span className="lotteryNumbersCircle">{lotteryRow.number4}</span>
                          <span className="lotteryNumbersCircle">{lotteryRow.number5}</span>
                          <span className="lotteryNumbersCircle">{lotteryRow.number6}</span>
                        </td>
                      </tr>
                    ))
                  }
              </tbody>
            </table>
          ) : ( // if the lotteryRows array is empty, render nothing
            null
          )}
      </div>
    </div>
  );
};