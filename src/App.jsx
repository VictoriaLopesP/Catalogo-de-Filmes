import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="container mt-4">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
