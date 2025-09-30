import Hero from './Hero';
import { Link } from 'react-router-dom';

const SearchView = ({ keyword, searchResults, hasSearched }) => {
  const title = keyword
    ? `Search results for "${keyword}"`
    : "Type in the search box to find movies";

  // Function to add a movie to Watch List
  const addToWatchList = (movie) => {
    const storedList = JSON.parse(localStorage.getItem("watchList")) || [];
    const alreadyAdded = storedList.some((item) => item.imdbID === movie.imdbID);

    if (alreadyAdded) {
      alert("Movie already in Watch List!");
      return;
    }

    const updatedList = [...storedList, movie];
    localStorage.setItem("watchList", JSON.stringify(updatedList));
    alert(`${movie.Title} added to Watch List!`);
  };

  // Render movie cards
  const resultsHtml = searchResults.map((movie, i) => {
    const detailUrl = `/movies/${movie.imdbID}`;
    return (
      <div key={i} className="card movie-card m-3 bg-dark text-white" style={{ width: "18rem" }}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/200x300?text=No+Image"
          }
          className="card-img-top"
          alt={movie.Title}
        />
        <div className="card-body">
          <h5 className="card-title">{movie.Title}</h5>
          <p className="card-text">{movie.Year}</p>
          <Link to={detailUrl} className="btn btn-primary me-2">
            See More
          </Link>
          <button
            className="btn btn-warning"
            onClick={() => addToWatchList(movie)}
          >
            + Watch List
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <Hero text={title} />

      <div className="d-flex overflow-auto p-3" style={{ gap: "1rem" }}>
        {searchResults.length > 0 ? (
          resultsHtml
        ) : hasSearched ? (
          <h2 className="text-center mt-5">No results found</h2>
        ) : (
          <h2 className="text-center mt-5">Type in the search box to find movies</h2>
        )}
      </div>
      <div className="movie-row">
  {resultsHtml}
</div>

    </>
  );
};

export default SearchView;
