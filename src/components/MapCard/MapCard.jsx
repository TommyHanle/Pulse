import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export default function MapCard({ searchZip, accessToken }) {
  const [map, setMap] = useState(null);

   useEffect(() => {
    const url = `/api/mapbox/${searchZip}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { lng, lat, accessToken } = data;
        mapboxgl.accessToken = accessToken;
        const newMap = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: 12
        });
        if (map) {
          map.remove();
        }
        setMap(newMap);
        return () => {
          newMap.remove();
        };
      })
      .catch(error => console.log(error));
  }, [searchZip]);


  useEffect(() => {
    if (map) {
      const url = `/api/mapbox/${searchZip}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const { lng, lat } = data;
          map.flyTo({
            center: [lng, lat],
            zoom: 12
          });
        })
        .catch(error => console.log(error));
    }
  }, [searchZip, map]);

  return (
    <div className="map-card-container">
      <div id="map" style={{ width: '70%', height: '300px' }}></div>
    </div>
  );
}
