const movieModel = require("./movie.model");
const { slugger } = require("../../utils/text");
const moment = require("moment");

// movie create (create)
const create = async (payload) => {
  const slug = slugger(payload?.title);
  const movie = await movieModel.findOne({ slug });
  if (movie) throw new Error("Movie title is already in use");
  // create the movie
  payload.slug = slug;
  return movieModel.create(payload);
};

// movie list (list)
const list = () => {
  return movieModel.find();
};

// get one movie (getById)
const getBySlug = (slug) => {
  return movieModel.findOne({ slug });
};

// update release Date (updateReleaseDate)
const updateReleaseDate = (slug, payload) => {
  //TODO check releaseDate is less than today (moment, luxon, date-fns)
  return movieModel.findOneAndUpdate({ slug }, payload, { new: true });
};

// update Movie Detail (update)
const update = (slug, payload) => {
  if (payload.title) {
    payload.slug = slugger(payload?.title);
  }
  return movieModel.updateOne({ slug }, payload);
};

// update Seat Number (updateSeats)
const updateSeats = async (slug, payload) => {
  const movie = await movieModel.findOne({ slug });
  if (payload.seats < Number(process.env.NO_OF_SEATS)) {
    throw new Error(`Movie seats cant be less than ${process.env.NO_OF_SEATS}`);
  }
  return movieModel.findOneAndUpdate({ slug }, payload, { new: true });
};

// delete movie (remove)
const remove = async (slug) => {
  const movie = await movieModel.findOne({ slug });
  // movie ticket should not be sold
  if (
    moment(movie?.releaseDate).isBefore(moment()) &&
    moment(movie?.endDate).isAfter(moment())
  ) {
    throw new Error("Movie is currently running...");
  }
  return movieModel.deleteOne({ slug });
};

module.exports = {
  create,
  list,
  getBySlug,
  updateReleaseDate,
  update,
  updateSeats,
  remove,
};
