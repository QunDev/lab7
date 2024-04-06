import Products from "../Models/Products.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find().populate("category");
    if (products.length === 0)
      return res.status(400).json({ message: "Không có sản phẩm" });
    return res.status(200).json({
      message: "Success",
      data: products,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id).populate("category");
    if (!product) return res.status(400).json({ message: "Không có sản phẩm" });
    return res.status(200).json({
      message: "Success",
      data: product,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, category, author } = req.body;
    const product = new Products({
      name,
      price,
      description,
      quantity,
      category,
      author,
    });
    const result = await product.save();
    if (!result) return res.status(400).json({ message: "Lỗi thêm db" });
    return res.status(200).json({
      message: "Tạo sản phẩm mới thành công",
      product: {
        id: result._id,
        name: result.name,
        price: result.price,
        description: result.description,
        quantity: result.quantity,
        category: result.category,
      },
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id).populate("category");
    if (!product)
      return res.status(400).json({ message: "Sản phẩm không tồn tại" });
    let { name, price, description, quantity, category } = req.body;
    name ? (product.name = name) : (product.name = product.name);
    price ? (product.price = price) : (product.price = product.price);
    description
      ? (product.description = description)
      : (product.description = product.description);
    quantity
      ? (product.quantity = quantity)
      : (product.quantity = product.quantity);
    category
      ? (product.category = category)
      : (product.category = product.category);
    const result = await product.save();
    if (!result) return res.status(400).json({ message: "Lỗi thêm db" });
    return res.status(200).json({
      message: "Câp nhật sản phẩm thành công",
      product: {
        id: result._id,
        name: result.name,
        price: result.price,
        description: result.description,
        quantity: result.quantity,
        category: result.category,
      },
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

export { getAllProducts, getProduct, addProduct, editProduct };
