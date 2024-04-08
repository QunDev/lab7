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

const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Categories.findById(id);
    if (!category)
      return res.status(400).json({ message: "Danh mục không tồn tại" });
    let { name, description } = req.body;
    name ? (category.name = name) : (category.name = category.name);
    description
      ? (category.description = description)
      : (category.description = category.description);
    const result = await category.save();
    if (!result) return res.status(400).json({ message: "Lỗi thêm db" });
    return res.status(200).json({
      message: "Câp nhật danh mục thành công",
      category: {
        id: result._id,
        name: result.name,
        description: result.description,
      },
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await Categories.findByIdAndDelete(id);
      if (!result) return res.status(400).json({ message: "Lỗi xóa" });
      return res.status(200).json({ message: "Xóa thành công" });
    }
    return res.status(400).json({ message: "ID không hợp lệ" });
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

export {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
