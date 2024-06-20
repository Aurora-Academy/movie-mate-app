const express = require("express");
const router = express.Router();

const movieRouter = require("../modules/movies/movie.api");
const orderRouter = require("../modules/orders/order.api");
const userRouter = require("../modules/users/user.api");

router.get("/api/v1", async (req, res, next) => {
  try {
    res.json({ msg: "MovieMate API is working..." });
  } catch (e) {
    next(e);
  }
});

router.use("/api/v1/movies", movieRouter);
router.use("/api/v1/orders", orderRouter);
router.use("/api/v1/users", userRouter);

module.exports = router;
