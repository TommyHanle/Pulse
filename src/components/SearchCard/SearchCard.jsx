import React, { useState } from 'react';

export function SearchCard({ priceData, forecastsData }) {
  const [userInputValue, setUserInputValue] = useState('');

  const handleUserInputChange = (event) => {
    setUserInputValue(event.target.value);
  };

  return (
    <>
      {priceData.map((priceRow, index) => {
        const forecastsRow = forecastsData[index];
        const forecastValues = forecastsRow
          ? forecastsRow.slice(10, 13).map((value) => {
              if (value === "-") return null;
              const multiplier = value / 100;
              const forecastPrice = multiplier >= 0
                ? priceRow[9] * (1 + multiplier)
                : priceRow[9] * (1 + multiplier);
              return Math.round(forecastPrice * 100) / 100;
            })
          : [null, null, null];

        const currentPrice = Math.round(priceRow[9] * 100) / 100;

        const userForecastValues = userInputValue
          ? forecastValues.map((value) => {
              if (value === null) return null;
              const multiplier = value / currentPrice - 1;
              const userForecastPrice = userInputValue * (1 + multiplier);
              return Math.round(userForecastPrice * 100) / 100;
            })
          : [null, null, null];

        return (
          <div className="card" key={index}>
            <p id="location">
              {priceRow[6]}, {priceRow[5]} - {priceRow[2]} - {priceRow[8]}
            </p>{" "}
            <div id="average">
              <div id="CAHV"><p>Current Average Home Value: ${currentPrice.toLocaleString()}</p> {/* Column J */} </div>
              <div id="CAHVNM"><p>Next Month: ${forecastValues[0] != null ? forecastValues[0].toLocaleString() : '-'}</p></div>
              <div id="CAHVNQ"><p>Next Quarter: ${forecastValues[1] != null ? forecastValues[1].toLocaleString() : '-'}</p></div>
              <div id="CAHVNY"><p>Next Year: ${forecastValues[2] != null ? forecastValues[2].toLocaleString() : '-'}</p></div>
            </div>
            <div id="custom">
              <div id="CEHV">
                <label>
                  Enter your current estimated home value: $ 
                  <input type="number" min="0" step="1000" value={userInputValue || ''} onChange={handleUserInputChange} />
                </label>
              </div>
              <div id="CEHVNM"><p>Next Month: ${userForecastValues[0] != null ? userForecastValues[0].toLocaleString() : '-'}</p></div>
              <div id="CEHVNQ"><p>Next Quarter: ${userForecastValues[1] != null ? userForecastValues[1].toLocaleString() : '-'}</p></div>
              <div id="CEHVNY"><p>Next Year: ${userForecastValues[2] != null ? userForecastValues[2].toLocaleString() : '-'}</p></div>
            </div>
          </div>
        );
      })}


    </>
  );
}
