import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";

import { dateFormatter } from "../../../utils/date";
import {
  listMovie,
  setCurrentPage,
  setLimit,
} from "../../../slices/movieSlice";

import CTable from "../../../components/Table";
import Paginate from "../../../components/Paginate";

const Movies = () => {
  const dispatch = useDispatch();
  const { total, currentPage, movies, limit } = useSelector(
    (state) => state.movies
  );

  const [fMovies, setFmovies] = useState([]);

  const extractHeader = (data) => {
    if (data.length === 0) return [];
    const {
      slug,
      synopsis,
      poster,
      createdAt,
      id,
      products,
      updatedAt,
      __v,
      _id,
      ...rest
    } = data[0];
    return Object.keys(rest);
  };

  const initFetch = useCallback(() => {
    dispatch(listMovie({ page: currentPage, limit, title: "" }));
  }, [dispatch, currentPage, limit]);

  const updateLimit = (number) => {
    dispatch(setLimit(number));
  };
  const updateCP = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    const data = [];
    movies.map((item) => {
      const { releaseDate, endDate, ...rest } = item;
      rest.releaseDate = dateFormatter(releaseDate);
      rest.endDate = dateFormatter(endDate);
      data.push(rest);
    });
    setFmovies(data);
  }, [movies]);

  return (
    <div className="mt-4">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <h3>Movies</h3>
            <button className="btn btn-danger btn-sm">+ New</button>
          </div>
        </Card.Header>
        <Card.Body>
          {fMovies.length > 0 && (
            <>
              <CTable
                header={extractHeader(movies)}
                data={fMovies}
                edit="/admin/movies"
              />

              <Paginate
                total={total}
                limit={limit}
                currentPage={currentPage}
                setCurrentPage={updateCP}
                setLimit={updateLimit}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Movies;
