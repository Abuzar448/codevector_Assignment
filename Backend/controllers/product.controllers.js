import product from "../Models/products.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({
        message: "All fields (name, category, price) are required.",
      });
    }

    const newProduct = await product.create({ name, price, category });
    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).json({
      message: `Error while Creating the new product due to ${error.message}`,
    });
  }
};


export const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const { category, cursor } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (cursor) {
      const decodedCursor = Buffer.from(cursor, 'base64').toString('ascii');
      const [cursorCreatedAt, cursorId] = decodedCursor.split('_');

      query.$or = [
        { createdAt: { $lt: new Date(cursorCreatedAt) } },
        {
          createdAt: new Date(cursorCreatedAt),
          _id: { $lt: cursorId }
        }
      ];
    }

    const products = await product.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1);

    const hasNextPage = products.length > limit;
    
    if (hasNextPage) {
      products.pop();
    }

    let nextCursor = null;
    if (products.length > 0 && hasNextPage) {
      const lastProduct = products[products.length - 1];
      const cursorString = `${lastProduct.createdAt.toISOString()}_${lastProduct._id}`;
      nextCursor = Buffer.from(cursorString).toString('base64');
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
      pagination: {
        hasNextPage,
        nextCursor
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: `Error while fetching products due to ${error.message}`,
    });
  }
};