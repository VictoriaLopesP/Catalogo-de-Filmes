import React from 'react';

function MovieCard({ movie, onShowTrailer }) {
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100">
        <img src={posterUrl} className="card-img-top" alt={movie.title} />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <p className="card-text">Release: {movie.release_date}</p>
          <p className="card-text">Nota: {movie.vote_average}</p>
          <button className="btn btn-primary" onClick={() => onShowTrailer(movie.id)}>Trailer</button> 
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
