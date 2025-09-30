import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutView from './components/AboutView';
import SearchView from './components/SearchView';
import MovieView from './components/MovieView';
import NotFound from './components/NotFound';
import WatchList from './components/WatchList';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchText.trim() === "") return;

    fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=thewdb`)
      .then(res => res.json())
      .then(data => {
        setHasSearched(true);
        if (data.Search) {
          setSearchResults(data.Search);
        } else {
          setSearchResults([]);
        }
      })
      .catch(err => console.error("Error fetching data:", err));
  };

  return (
    <div>
      <Navbar 
        searchText={searchText} 
        setSearchText={setSearchText} 
        handleSearch={handleSearch}
      />

      <Routes>
        <Route
          path="/"
          element={<SearchView keyword={searchText} searchResults={searchResults} hasSearched={hasSearched} />}
        />
        <Route path="/about" element={<AboutView />} />
        <Route
          path="/search"
          element={<SearchView keyword={searchText} searchResults={searchResults} hasSearched={hasSearched} />}
        />
        <Route path="/movies/:id" element={<MovieView />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
