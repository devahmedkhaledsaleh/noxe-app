import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  let { type, id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const getDetails = async () => {
    setLoading(true);
    let { data } = await axios.get(`
        https://api.themoviedb.org/3/${type}/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`);
    setLoading(false);
    setDetails(data);
  };

  useEffect(() => {
    getDetails();
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
      {details ? (
        <div className="col-md-12">
          <div className="movie py-5">
            <div className="row">
              <div className="col-md-3 ">
                {type === "person" ? (
                  <img
                    className="w-100"
                    src={
                      "https://image.tmdb.org/t/p/w500/" + details.profile_path
                    }
                    alt=""
                  />
                ) : (
                  <img
                    className="w-100"
                    src={
                      "https://image.tmdb.org/t/p/w500/" + details.poster_path
                    }
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <h3 className="h6">
                  {type === "movie" ? details.title : details.name}
                </h3>
                <h3 className="h6">
                  {type === "person" ? details.biography : details.overview}
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
