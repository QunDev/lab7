import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const checkAuthor = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer)
      return res.status(400).json({ message: "Vui lòng đăng nhập." });
    let token = bearer.split(" ")[1];
    if (!token) token = bearer;
    const id = jwt.verify(token, process.env.SECRET_KEY);
    if (!id)
      return res.status(400).json({
        message: "Lỗi phân tích id",
      });
    req.body.author = id.id;
    next();
  } catch (e) {
    return res.status(400).json({
      message: "Error: " + e,
    });
  }
};

export default checkAuthor;
