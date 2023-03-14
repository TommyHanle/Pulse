import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import SearchBar from '../../components/SearchBar/SearchBar';
import { SearchCard } from '../../components/SearchCard/SearchCard';
import NavBar from '../../components/NavBar/NavBar';
import MapCard from '../../components/MapCard/MapCard';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [searchData, setSearchData] = useState({ priceData: [], forecastsData: [] });
  const [searchZip, setSearchZip] = useState('');

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`/api/search?searchTerm=${searchTerm}`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data:', data); // Log the data to check if it's being received correctly
      setSearchData(data);
      setSearchZip(searchTerm);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <SearchBar onSearch={handleSearch} />
          <SearchCard priceData={searchData.priceData} forecastsData={searchData.forecastsData} />
          {searchZip && <MapCard searchZip={searchZip} />}
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
