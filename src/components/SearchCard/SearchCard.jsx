export function SearchCard({ data }) {
    return (
      <>
        {data.map((row, index) => (
          <div className="card" key={index}>
            <p>{row[6]}, {/* Column C */}
            {row[5]} - {/* Column F */}
            {row[2]} - {/* Column G */}
            {row[8]}</p> {/* Column I */}
            <p>Current Average Home Value:  ${row[9]}</p> {/* Column J */}
            {/* Render more columns as needed */}
          </div>
        ))}
      </>
    );
  }
  