import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export default function MapCard({ searchZip }) {
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState([-122.42, 37.77]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidG9tbXloYW5sZSIsImEiOiJjbGR3Nzk4MGowNGpjM3BwZHZ2bXBiN2tzIn0.ZJ9MqcQlJRV0N2LYEprQxA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 12
    });
    setMap(map);

    return () => {
      map.remove();
    };
  }, [coordinates]);

  useEffect(() => {
    if (searchZip) {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchZip}.json?country=US&access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          const lng = data.features[0].center[0];
          const lat = data.features[0].center[1];
          setCoordinates([lng, lat]);
        })
        .catch(error => console.log(error));
    }
  }, [searchZip]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
}
