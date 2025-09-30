import Hero from './Hero';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MovieView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=thewdb`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  // If movie is still loading
  if (!movie) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // If movie not found
  if (movie.Response === "False") {
    return <div className="text-center mt-5 text-danger">{movie.Error}</div>;
  }

  return (
    <>
      <Hero text={movie.Title} backdrop={movie.Poster} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <img
              src={ movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image" }

              alt={movie.Title}
              className="img-fluid shadow"
            />
          </div>
          <div className="col-md-8">
            <h2>{movie.Title}</h2>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieView;
