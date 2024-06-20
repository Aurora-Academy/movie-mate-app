const orderModel = require("./order.model");
const movieModel = require("../movies/movie.model");

const { v4: uuidv4 } = require("uuid");

const create = async (payload) => {
  payload.id = uuidv4();
  // Check the movie Seats count
  payload?.products.map(async (product) => {
    const movie = await movieModel.findOne({ _id: product?.movie });
    if (!movie) throw new Error("No movie found");
    if (movie.seats < product?.quantity)
      throw new Error("Seats are not available");
  });
  // Create the order
  const order = await orderModel.create(payload);
  if (!order) throw new Error("Order not fulfilled");
  order.products.map(async (product) => {
    const movie = await movieModel.findOne({ _id: product?.movie });
    if (!movie) throw new Error("No movie found");
    if (movie.seats < product?.quantity)
      throw new Error("Seats are not available");
    // Subtract the seats
    await movieModel.updateOne(
      { _id: product?.movie },
      { seats: movie?.seats - product?.quantity }
    );
  });
  return order;
};

const getById = async (id) => {
  const result = await orderModel.aggregate([
    {
      $match: {
        id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "buyer",
        foreignField: "_id",
        as: "buyer",
      },
    },
    {
      $unwind: {
        path: "$buyer",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        "buyer.password": false,
        "buyer.roles": false,
        "buyer.isActive": false,
        "buyer.isEmailVerified": false,
      },
    },
    //TODO Project for aggregating movies
  ]);
  return result[0];
};

const updateById = (id, payload) => {
  const { status, ...rest } = payload;
  return orderModel.findOneAndUpdate({ id }, rest, { new: true });
};

const list = async ({ page = 1, limit = 10, search }) => {
  const query = [];
  if (search.id) {
    query.push({
      $match: {
        buyer: search.id,
      },
    });
  }
  // Pagination
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
      },
    }
  );
  const result = await orderModel.aggregate(query);
  return {
    total: result[0]?.total || 0,
    orders: result[0]?.data,
    page: +page,
    limit: +limit,
  };
};

const changeStatus = async (id, payload) => {
  const order = await orderModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  if (!order) throw new Error("Order not found");
  if (order?.status === "cancelled" || order?.status === "failed") {
    order?.products.map(async (product) => {
      const movie = await movieModel.findOne({ _id: product?.movie });
      if (!movie) throw new Error("Movie not found");
      await movieModel.updateOne(
        { _id: movie._id },
        { seats: movie?.seats + product?.quantity }
      );
    });
  }
  return order;
};

module.exports = { create, getById, updateById, list, changeStatus };
