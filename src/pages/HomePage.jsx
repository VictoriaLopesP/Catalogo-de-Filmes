import React, { useEffect, useState } from 'react';
import MovieSection from '../components/MovieSection';
import { getPopularMovies, getTrendingMovies } from '../api';

function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // ajustar a pesquisa com e usar router depois
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const popularData = await getPopularMovies();
        setPopularMovies(popularData.results);

        const trendingData = await getTrendingMovies();
        setTrendingMovies(trendingData.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const handleShowTrailer = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
      const data = await response.json();
      const trailer = data.results.find(video => video.type === 'Trailer'); 
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
      } else {
        setTrailerUrl(null);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const handleCloseTrailer = () => {
    setTrailerUrl(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <MovieSection title="Trending Movies" movies={trendingMovies} onShowTrailer={handleShowTrailer} />
      <MovieSection title="Popular Movies" movies={popularMovies} onShowTrailer={handleShowTrailer} />

      {trailerUrl && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Trailer</h5>
                <button type="button" className="btn-close" onClick={handleCloseTrailer}></button>
              </div>
              <div className="modal-body">
                <iframe
                  width="100%"
                  height="315"
                  src={trailerUrl.replace("watch?v=", "embed/")} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseTrailer}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="search-results" style={{ position: 'absolute', background: 'white', zIndex: 1000, border: '1px solid #ccc', padding: '10px', width: '300px' }}>
          <h5>Search Results:</h5>
          {searchResults.map(movie => (
            <div key={movie.id}>
              <h6>{movie.title}</h6>
              <p>Release: {movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
