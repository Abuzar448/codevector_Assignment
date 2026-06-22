import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

productSchema.index({createdAt:-1,_id:-1});

const product = mongoose.model("product", productSchema);
export default product;
