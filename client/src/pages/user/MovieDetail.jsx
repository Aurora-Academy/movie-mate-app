import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import { useDispatch, useSelector } from "react-redux";

import { add } from "../../slices/cartSlice";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const { movie, getBySlug } = useMovies();

  useEffect(() => {
    const movie = pathname.split("/")[2];
    getBySlug(movie);
  }, [pathname, getBySlug]);

  return (
    <>
      <section className="">
        <div className="container flex mt-2 d-flex justify-content-center">
          <div className="col-lg-8 border p-2 bg-white">
            <div className="row hedding m-0 pl-3 pt-0 pb-3">
              {movie?.seats < 1 && <div className="text-danger">Sold Out</div>}
            </div>
            <div className="row m-0">
              <div className="col-lg-4 left-side-movie-box pb-3">
                {movie?.poster && movie?.poster.length > 0 ? (
                  <img src={movie?.poster} className="border p-3 w-100" />
                ) : null}
                <span className="sub-img">
                  {movie?.images &&
                    movie?.images.slice(1).map((image, index) => {
                      return <img key={index} src="" className="border p-2" />;
                    })}
                </span>
              </div>
              <div className="col-lg-8">
                <div className="right-side-pro-detail border p-3 m-0">
                  <div className="row">
                    <div className="col-lg-12">
                      <span>Movie Info</span>
                      <p className="m-0 p-0">{movie?.title}</p>
                    </div>
                    <div className="col-lg-12">
                      <p className="m-0 p-0 price-pro">NPR {movie?.price}</p>
                      <hr className="p-0 m-0" />
                    </div>
                    <div className="col-lg-12 pt-2">
                      <h5>Synopsis</h5>
                      <span>{movie?.synopsis}</span>
                      <hr className="m-0 pt-2 mt-2" />
                    </div>
                    <div className="col-lg-12">
                      <p className="tag-section">
                        <strong>Rating : </strong>
                        {movie?.rating}
                      </p>
                      <p className="tag-section">
                        <strong>Duration : </strong>
                        {movie?.duration}
                      </p>
                    </div>
                    <div className="col-lg-12">
                      <h6>Tickets :</h6>
                      <input
                        type="number"
                        className="form-control text-center w-100"
                        min={"1"}
                        max={movie?.seats}
                        disabled={movie?.seats < 1 ? true : false}
                      />
                    </div>
                    <div className="col-lg-12 mt-3">
                      <div className="row">
                        <div className="col-lg-6 pb-2">
                          <button
                            href="#"
                            className="btn btn-danger w-100"
                            disabled={movie?.seats < 1 ? true : false}
                            onClick={() => {
                              dispatch(add(movie));
                            }}
                          >
                            Add To Cart&nbsp;
                            {cart.length > 0 &&
                            cart.filter((item) => item?.slug === movie?.slug)
                              .length > 0
                              ? `(${
                                  cart.filter(
                                    (item) => item.slug === movie.slug
                                  )[0]?.quantity
                                })`
                              : `(0)`}
                          </button>
                        </div>
                        <div className="col-lg-6">
                          <button
                            href="#"
                            className="btn btn-success w-100"
                            disabled={movie?.seats < 1 ? true : false}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetail;
