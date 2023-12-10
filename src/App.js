import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeywords] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const getTracks = async () => {
    setIsloading(true);
    let data = await fetch(
      `https://v1.nocodeapi.com/shoaib_h/spotify/RHoBVAtVWuaiOEmm/search?q=${keyword}`
    );
    let convertedData = await data.json();
    console.log(convertedData);
    setTracks(convertedData.albums.items);
    setIsloading(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Spotify-Imusic
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(event) => setKeywords(event.target.value)}
              className="form-control me-2 w-80"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <button onClick={getTracks} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col"></div>

          {isLoading && tracks.length < 1 ? (
            <div className="spinner-border" role="status">
              <span hidden>Loading...</span>
            </div>
          ) : (
            tracks.map((element) => (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <img
                    className="card-img-top"
                    src={element.images[0].url}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      Artist: {element.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release date: {element.release_date}
                    </p>
                    {element.preview_url ? (
                      <audio
                        src={element.preview_url}
                        controls
                        className="w-100"
                      ></audio>
                    ) : (
                      <p>Preview not available</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
