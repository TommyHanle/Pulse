import React, { useState } from 'react';

export function SearchCard({ priceData, forecastsData }) {
  const [userInputValue, setUserInputValue] = useState('');

  const handleUserInputChange = (event) => {
    setUserInputValue(event.target.value);
  };

  return (
    <>
      <h2>Price Data</h2>
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
            <p>
              {priceRow[6]}, {/* Column C */}
              {priceRow[5]} - {/* Column F */}
              {priceRow[2]} - {/* Column G */}
              {priceRow[8]}
            </p>{" "}
            {/* Column I */}
            <p>Current Average Home Value: ${currentPrice.toLocaleString()}</p> {/* Column J */}
            <ul>
              <li>Value 1: {forecastValues[0] != null ? forecastValues[0].toLocaleString() : '-'}</li>
              <li>Value 2: {forecastValues[1] != null ? forecastValues[1].toLocaleString() : '-'}</li>
              <li>Value 3: {forecastValues[2] != null ? forecastValues[2].toLocaleString() : '-'}</li>
            </ul>
            <div>
              <label>
                Enter your current estimated home value:
                <input type="number" min="0" step="1000" value={userInputValue || ''} onChange={handleUserInputChange} />
              </label>
            </div>
            <ul>
              <li>User Value 1: {userForecastValues[0] != null ? userForecastValues[0].toLocaleString() : '-'}</li>
              <li>User Value 2: {userForecastValues[1] != null ? userForecastValues[1].toLocaleString() : '-'}</li>
              <li>User Value 3: {userForecastValues[2] != null ? userForecastValues[2].toLocaleString() : '-'}</li>
            </ul>
          </div>
        );
      })}

      <h2>Forecasts Data</h2>
      {forecastsData.map((row, index) => (
        <div className="card" key={index}>
          <p> {row[10]} </p>
          <p> {row[11]} </p>
          <p> {row[12]} </p>
        </div>
      ))}
    </>
  );
}
