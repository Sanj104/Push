import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ searchText, setSearchText, handleSearch }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      handleSearch();      // 🔑 call fetch only here
      navigate("/search"); // go to search page
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div
        className="container-fluid"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "100px",
          position: "sticky",
          top: "0",
          zIndex: "1000",
          backgroundColor: "#f8f9fa"
        }}
      >
        <Link className="navbar-brand" to="/">Movie Browser</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">About</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link active" to="/watchList">Watch List</Link>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for...."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
