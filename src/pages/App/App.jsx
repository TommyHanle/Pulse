import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage';
import SearchBar from '../../components/SearchBar/SearchBar';
import { SearchCard } from '../../components/SearchCard/SearchCard';
import NavBar from '../../components/NavBar/NavBar'
import searchSheet from '../../utilities/search-sheet';

export default function App() {
  const [ user, setUser ] = useState(getUser());
  const [ searchData, setSearchData ] = useState([]);

  const handleSearch = async (searchTerm) => {
    const matchingRows = await searchSheet(searchTerm);
    setSearchData(matchingRows);
  }

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <SearchBar onSearch={handleSearch} />
          <SearchCard data={searchData} />
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
