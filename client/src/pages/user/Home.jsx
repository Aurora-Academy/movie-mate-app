import "./Home.css";
import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosBasket } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../../slices/cartSlice";

import { useMovies } from "../../hooks/useMovies";

import Paginate from "../../components/Paginate";

const Home = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [featuredMov, setFeaturedMov] = useState(null);

  const { data, error, msg, loading, getAllMovies } = useMovies();

  const getFeaturedMovie = useCallback(() => {
    const result = data?.data?.movies[0];
    setFeaturedMov(result);
  }, [data]);

  useEffect(() => {
    getAllMovies({ limit, page, title });
  }, [limit, page, title, getAllMovies]);

  useEffect(() => {
    if (!featuredMov) getFeaturedMovie();
  }, [featuredMov, getFeaturedMovie]);

  return (
    <>
      <div className="container">
        <div className="row m-5">
          <div className="col-md-9">
            <h2 className="featurette-heading">{featuredMov?.title}</h2>
            <p className="lead">{featuredMov?.synopsis}</p>
            <div className="flex d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  dispatch(add(featuredMov));
                }}
              >
                <IoIosBasket />
                &nbsp;
                {cart.length > 0 &&
                cart.filter((item) => item?.slug === featuredMov?.slug).length >
                  0
                  ? `(${
                      cart.filter((item) => item.slug === featuredMov.slug)[0]
                        ?.quantity
                    })`
                  : `(0)`}
              </button>
              <Link to={`/movies/${featuredMov?.slug}`}>
                <button className="btn btn-danger">Buy Now</button>
              </Link>
            </div>
          </div>
          <div className="col-md-3">
            <img src={featuredMov?.poster} style={{ maxHeight: "420px" }} />
          </div>
        </div>
      </div>
      <div className="album py-5 bg-light">
        <div className="container mb-2">
          <div className="row">
            <div className="col-md-5">
              <Form.Label>Search Movie by Title</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {data?.data?.movies.length > 0 ? (
              data.data.movies.map((movie) => {
                return (
                  <div key={movie?.slug} className="col-md-3">
                    <div className="card mb-4 shadow-sm">
                      <img src={movie?.poster} />
                      <div className="card-body">
                        <h5 className="card-title">{movie?.title}</h5>
                        <p className="card-text">
                          {movie?.synopsis.substring(0, 95).concat("...")}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                dispatch(add(movie));
                              }}
                            >
                              <IoIosBasket />
                              &nbsp;
                              {cart.length > 0 &&
                              cart.filter((item) => item.slug === movie.slug)
                                .length > 0
                                ? `(${
                                    cart.filter(
                                      (item) => item?.slug === movie?.slug
                                    )[0]?.quantity
                                  })`
                                : `(0)`}
                            </button>
                            <Link to={`/movies/${movie?.slug}`}>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                              >
                                Buy Now
                              </button>
                            </Link>
                          </div>
                          <small className="text-muted">
                            {movie?.duration}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>No movies</>
            )}
          </div>
          {data?.data?.total && (
            <Paginate
              total={data?.data?.total}
              limit={limit}
              currentPage={page}
              setCurrentPage={setPage}
              setLimit={setLimit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
