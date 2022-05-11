import { Pagination, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Tv() {
    const [loading, setLoading] = useState(false);
    const [tv, setTv] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
  
    const getTv = async () => {
      setLoading(true);
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=f1aca93e54807386df3f6972a5c33b50&page=${currentPage}`
      );
      setLoading(false);
      setTv(data);
    };
  
    useEffect(() => {
        getTv();
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
              Trending <br /> Tv <br /> To Watch Now
            </h2>
            <p className="text-muted">Lorem ipsum dolor sit amet consectetur.</p>
            <div className="border my-3"></div>
          </div>
          {tv && !loading
            ? tv.results?.map((tvSe, index) => {
                if (tvSe.id && tvSe.poster_path && tvSe.name) {
                  return (
                    <div key={index} className="col-md-2 my-2">
                      <div className="movie">
                      <Link to={`/details/tv/${tvSe.id}`}>
                        <img
                          className="w-100"
                          src={
                            "https://image.tmdb.org/t/p/w500/" + tvSe.poster_path
                          }
                          alt=""
                        />
                        <h3 className="h6 my-2">{tvSe.name}</h3>
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
  
        {tv && !loading ? (
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
