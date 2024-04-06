import Categories from "../Models/Categories.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    if (categories.length === 0)
      return res.status(400).json({ message: "Không có danh mục" });
    return res.status(200).json({
      message: "Success",
      data: categories,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const category = Categories.findById({ id });
    if (category) return res.status(400).json({ message: "Không có danh mục" });
    return res.status(200).json({
      message: "Success",
      data: category,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, description, author } = req.body;
    const category = new Categories({
      name,
      description,
      author,
    });
    const checkCategoryExist = await Categories.findOne({ name });
    if (checkCategoryExist)
      return res.status(400).json({ message: "Danh mục đã tồn tại" });
    const result = await category.save();
    if (!result)
      return res.status(400).json({
        message: "Lưu không thành công",
      });
    return res.status(200).json({
      message: "Tạo thành công danh mục " + category.name,
      category: {
        name: category.name,
        description: category.description,
      },
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

export { getAllCategories, getCategory, addCategory };
