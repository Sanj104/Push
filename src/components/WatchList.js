import Hero from "./Hero";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const WatchList = () => {
  const [watchList, setWatchList] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("watchList")) || [];
    setWatchList(storedList);
  }, []);

  const removeFromWatchList = (imdbID) => {
    const updatedList = watchList.filter((movie) => movie.imdbID !== imdbID);
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <>
      <Hero text="My Watch List" />
      <div className="position-relative p-4">
        {/* LEFT BUTTON */}
        {watchList.length > 0 && (
          <button
            onClick={scrollLeft}
            className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
            style={{ zIndex: 10, opacity: 0.8 }}
          >
            ◀
          </button>
        )}

        {/* HORIZONTAL SCROLL CONTAINER */}
        <div
          ref={scrollRef}
          className="d-flex overflow-auto"
          style={{
            gap: "1rem",
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            padding: "0 3rem",
          }}
        >
          {watchList.length > 0 ? (
            watchList.map((item, i) => {
              const detailUrl = `/movies/${item.imdbID}`;
              return (
                <div
                  key={i}
                  className="card shadow-lg"
                  style={{
                    width: "18rem",
                    backgroundColor: "#1c1c1c",
                    color: "#f5f5f5",
                    flex: "0 0 auto", // 👈 prevents wrapping, keeps cards in a row
                  }}
                >
                  <img
                    src={
                      item.Poster !== "N/A"
                        ? item.Poster
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={item.Title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.Title}</h5>
                    <p className="card-text">{item.Year}</p>
                    <Link to={detailUrl} className="btn btn-info me-2">
                      See more
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromWatchList(item.imdbID)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h2 className="text-center mt-5">Your watch list is empty</h2>
          )}
        </div>

        {/* RIGHT BUTTON */}
        {watchList.length > 0 && (
          <button
            onClick={scrollRight}
            className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
            style={{ zIndex: 10, opacity: 0.8 }}
          >
            ▶
          </button>
        )}
      </div>
    </>
  );
};

export default WatchList;
