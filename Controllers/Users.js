import Users from "../Models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmailExist = await Users.findOne({ email });
    if (checkEmailExist)
      return res.status(400).json({ message: "Email đã tồn tại" });
    const passwordHash = await bcrypt.hash(password, 10);
    if (!passwordHash)
      return res
        .status(400)
        .json({ message: "Lỗi trong quá trình tạo password" });
    const user = new Users({ email, password: passwordHash });
    const result = await user.save();
    if (!result) return res.status(400).json({ message: "Lỗi thêm db" });
    return res.status(200).json({
      message: "Đăng ký thành công",
      user: {
        id: result._id,
        email: result.email,
      },
    });
  } catch (e) {
    return res.status(400).json({ message: "ERROR: " + e });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmailExist = await Users.findOne({ email });
    if (!checkEmailExist)
      return res.status(400).json({ message: "Email không tồn tại" });
    const isPass = await bcrypt.compare(password, checkEmailExist.password);
    if (!isPass) return res.status(400).json({ message: "Sai password" });
    const token = jwt.sign(
      { id: checkEmailExist._id },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );
    return res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        email: checkEmailExist.email,
        token,
      },
    });
  } catch (e) {
    return res.status(400).json({ message: "ERROR: " + e });
  }
};

export { register, login };
