import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState({});
  const [trendingTv, setTrendingTv] = useState({});
  const [trendingPeople, setTrendingPeople] = useState({});

  const getTrending = async (type, setType) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    setType(data);
  };

  useEffect(() => {
    setLoading(true);
    getTrending("movies", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPeople);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : (
        ""
      )}

      <div className="row py-4">
        <div className="col-md-4 py-3">
          <div className="border my-3 w-25"></div>
          <h2 className="h3 my-2">
            Trending <br /> Movies <br /> To Watch Now
          </h2>
          <p className="text-muted">Lorem ipsum dolor sit amet consectetur.</p>
          <div className="border my-3"></div>
        </div>

        {trendingMovies && !loading
          ? trendingMovies.results?.map((movie, index) => {
              if (movie.id && movie.poster_path && movie.title) {
                return (
                  <div key={index} className="col-md-2 my-2">
                    <div className="movie">
                      <Link to={`/details/movie/${movie.id}`}>
                        <img
                          className="w-100"
                          src={
                            "https://image.tmdb.org/t/p/w500/" +
                            movie.poster_path
                          }
                          alt=""
                        />
                        <h3 className="h6 my-2">{movie.title}</h3>
                      </Link>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          : ""}
      </div>

      <div className="row py-4">
        <div className="col-md-4 py-3">
          <div className="border my-3 w-25"></div>
          <h2 className="h3 my-2">
            Trending <br /> Tv <br /> To Watch Now
          </h2>
          <p className="text-muted">Lorem ipsum dolor sit amet consectetur.</p>
          <div className="border my-3"></div>
        </div>

        {trendingTv && !loading
          ? trendingTv.results?.map((tv, index) => {
              if (tv.id && tv.poster_path && tv.name) {
                return (
                  <div key={index} className="col-md-2 my-2">
                    <div className="movie">
                      <Link to={`/details/tv/${tv.id}`}>
                        <img
                          className="w-100"
                          src={
                            "https://image.tmdb.org/t/p/w500/" + tv.poster_path
                          }
                          alt=""
                        />
                        <h3 className="h6 my-2">{tv.name}</h3>
                      </Link>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          : ""}
      </div>

      <div className="row py-4">
        <div className="col-md-4 py-3">
          <div className="border my-3 w-25"></div>
          <h2 className="h3 my-2">
            Trending <br /> People <br /> To Watch Now
          </h2>
          <p className="text-muted">Lorem ipsum dolor sit amet consectetur.</p>
          <div className="border my-3"></div>
        </div>

        {trendingPeople && !loading
          ? trendingPeople.results?.map((person, index) => {
              if (person.id && person.profile_path && person.name) {
                return (
                  <div key={index} className="col-md-2 my-2">
                    <div className="movie">
                      <Link to={`/details/person/${person.id}`}>
                        <img
                          className="w-100"
                          src={
                            "https://image.tmdb.org/t/p/w500/" +
                            person.profile_path
                          }
                          alt=""
                        />
                        <h3 className="h6 my-2">{person.name}</h3>
                      </Link>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          : ""}
      </div>
    </>
  );
}
