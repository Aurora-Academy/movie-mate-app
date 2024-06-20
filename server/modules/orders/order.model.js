const { Schema, model } = require("mongoose");
const { ObjectId, UUID } = Schema.Types;

const orderSchema = new Schema(
  {
    id: { type: String, unique: true, required: true },
    buyer: { type: ObjectId, ref: "User", required: true },
    total: { type: Number, required: true },
    products: [
      {
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
        movie: { type: ObjectId, ref: "movie", required: true },
      },
    ],
    type: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "ONLINE",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "pending",
    },
    approvedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
