import React, { useState } from 'react';
import MovieCard from './MovieCard';

function MovieSection({ title, movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleMovies = movies.slice(currentIndex, currentIndex + 4);

  const handleNext = () => {
    if (currentIndex + 4 < movies.length) {
      setCurrentIndex(currentIndex + 1); 
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); 
    }
  };

  return (
    <div className="my-4 section-spacing">
      <h2 className="title-spacing">{title}</h2>
      
      <div className="d-none d-md-block carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className={`carousel-item active`}>
            <div className="row">
              {visibleMovies.map(m => (
                <MovieCard key={m.id} movie={m} onShowTrailer={() => {/* vou implementar a função de mostrar trailer */}} />
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={handleNext}
          disabled={currentIndex + 4 >= movies.length}
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="d-block d-md-none">
        <div className="row">
          {movies.map(m => (
            <MovieCard key={m.id} movie={m} onShowTrailer={() => {/* vou implementar a função de mostrar trailer */}} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
