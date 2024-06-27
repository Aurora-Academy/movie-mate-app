import { useState, useCallback } from "react";
import MovieServices from "../services/movies";

export const useMovies = () => {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState({});

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Admin Movies List Page, User side Home page
  const getAllMovies = useCallback(async ({ limit, page, title }) => {
    try {
      setLoading(true);
      const data = await MovieServices.list(limit, page, title);
      setData(data.data);
      setMsg(data?.data?.msg);
      return data?.data;
    } catch (err) {
      const errMsg = err?.response?.data?.msg || "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
        setMsg("");
      }, 2000);
    }
  }, []);

  // Admin Movies Movie Detail Page, User side Movie Detail
  const getBySlug = useCallback(async (slug) => {
    try {
      setLoading(true);
      const result = await MovieServices.getBySlug(slug);
      setMovie(result.data.data);
      setMsg(result.data.msg);
      return result.data.data;
    } catch (err) {
      const errMsg = err.response.data.msg || "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
        setMsg("");
      }, 2000);
    }
  }, []);

  return { data, movie, error, msg, loading, getAllMovies, getBySlug };
};
