export function SearchCard({ priceData, forecastsData }) {
    return (
      <>
        <h2>Price Data</h2>
        {priceData.map((priceRow, index) => {
          const forecastsRow = forecastsData[index];
          const forecastValues = forecastsRow
            ? forecastsRow.slice(10, 13).map((value) => {
                if (value === "-") return null;
                const multiplier = value / 100;
                return multiplier >= 0
                  ? priceRow[9] * (1 + multiplier)
                  : priceRow[9] * (1 + multiplier);
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
              <p>Current Average Home Value: ${priceRow[9]}</p> {/* Column J */}
              <ul>
                <li>Value 1: {forecastValues[0]}</li>
                <li>Value 2: {forecastValues[1]}</li>
                <li>Value 3: {forecastValues[2]}</li>
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
  