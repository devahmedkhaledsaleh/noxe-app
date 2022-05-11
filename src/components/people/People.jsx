import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function People() {
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const getPersons = async () => {
    setLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/person/day?api_key=f1aca93e54807386df3f6972a5c33b50&page=${currentPage}`
    );
    setLoading(false);
    setPersons(data);
  };

  useEffect(() => {
    getPersons();
  }, [currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

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
            Trending <br /> Persons <br /> To Watch Now
          </h2>
          <p className="text-muted">Lorem ipsum dolor sit amet consectetur.</p>
          <div className="border my-3"></div>
        </div>
        {persons && !loading
          ? persons.results?.map((person, index) => {
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

      {/* Pagination */}

      {persons && !loading ? (
        <Stack spacing={2} direction="row" justifyContent="center" my="20px">
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={handleChange}
          />
        </Stack>
      ) : (
        ""
      )}

      {/* Pagination */}
    </>
  );
}
