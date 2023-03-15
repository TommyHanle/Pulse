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
              <div className="specialtext">
                <p><span className="bold-text">Current Average Home Value: $</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currentPrice.toLocaleString()}</p>
              </div>
              <div className="text">
                <p><span className="bold-text">Next Month: $</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{forecastValues[0] != null ? forecastValues[0].toLocaleString() : '-'}</p>
              </div>
              <div className="text">
                <p><span className="bold-text">Next Quarter: $</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{forecastValues[1] != null ? forecastValues[1].toLocaleString() : '-'}</p>
              </div>
              <div className="text">
                <p><span className="bold-text">Next Year: $</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{forecastValues[2] != null ? forecastValues[2].toLocaleString() : '-'}</p>
              </div>
            </div>
            <div id="custom">
              <div id="CEHV">
                <label>
                  <span className="bold-text">Custom Value: $ </span>
                  <input type="number" min="0" step="1000" value={userInputValue || ''} onChange={handleUserInputChange} />
                </label>
              </div>
              <div className="text">
                <p><span className="bold-text">Next Month: $</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userForecastValues[0] != null ? userForecastValues[0].toLocaleString() : '-'}</p>
              </div>
              <div className="text">
                <p><span className="bold-text">Next Quarter: $</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userForecastValues[1] != null ? userForecastValues[1].toLocaleString() : '-'}</p>
              </div>
              <div className="text">
                <p><span className="bold-text">Next Year: $</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userForecastValues[2] != null ? userForecastValues[2].toLocaleString() : '-'}</p>
              </div>
            </div>
          </div>
        );
      })}


    </>
  );
}
