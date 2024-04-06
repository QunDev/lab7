import Joi from "joi";

const regex =
  /^(?=.{1,254}$)(([^\s@"]+(\.[^\s@"]+)*)|(["].+["]))@((?:[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,})$/;

const Product = Joi.object({
  name: Joi.string().min(5).required().messages({
    "string.base": "Tên sản phẩm phải là chuỗi",
    "string.empty": "Tên sản phẩm không được để trống",
    "string.min": "Tên sản phẩm ít nhất {#limit} ký tự",
    "any.required": "Tên sản phẩm là bắt buộc",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Giá phải là một số",
    "number.min": "Giá phải lớn hơn {#limit}",
    "any.required": "Giá là bắt buộc",
  }),
  description: Joi.string().min(5).required().messages({
    "string.base": "Mô tả sản phẩm phải là chuỗi",
    "string.empty": "Mô tả sản phẩm không được để trống",
    "string.min": "Mô tả sản phẩm ít nhất {#limit} ký tự",
    "any.required": "Mô tả sản phẩm là bắt buộc",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Số lượng phải là một số",
    "number.integer": "Số lượng phải là số nguyên",
    "number.min": "Số lượng phải lớn hơn {#limit}",
    "any.required": "Số lượng là bắt buộc",
  }),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": `Trường 'author' phải là một chuỗi.`,
      "string.empty": `Trường 'author' không được để trống.`,
      "string.pattern.base": `Trường 'author' phải là một chuỗi ObjectId hợp lệ.`,
      "any.required": `Trường 'author' là bắt buộc.`,
    }),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": `Trường 'category' phải là một chuỗi.`,
      "string.empty": `Trường 'category' không được để trống.`,
      "string.pattern.base": `Trường 'category' phải là một chuỗi ObjectId hợp lệ.`,
      "any.required": `Trường 'category' là bắt buộc.`,
    }),
  createdAt: Joi.date(),
});

const ProductUpdate = Joi.object({
  name: Joi.string().min(5).messages({
    "string.base": "Tên sản phẩm phải là chuỗi",
    "string.empty": "Tên sản phẩm không được để trống",
    "string.min": "Tên sản phẩm ít nhất {#limit} ký tự",
  }),
  price: Joi.number().min(0).messages({
    "number.base": "Giá phải là một số",
    "number.min": "Giá phải lớn hơn {#limit}",
  }),
  description: Joi.string().min(5).messages({
    "string.base": "Mô tả sản phẩm phải là chuỗi",
    "string.empty": "Mô tả sản phẩm không được để trống",
    "string.min": "Mô tả sản phẩm ít nhất {#limit} ký tự",
  }),
  quantity: Joi.number().integer().min(1).messages({
    "number.base": "Số lượng phải là một số",
    "number.integer": "Số lượng phải là số nguyên",
    "number.min": "Số lượng phải lớn hơn {#limit}",
  }),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)

    .messages({
      "string.base": `Trường 'author' phải là một chuỗi.`,
      "string.empty": `Trường 'author' không được để trống.`,
      "string.pattern.base": `Trường 'author' phải là một chuỗi ObjectId hợp lệ.`,
    }),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)

    .messages({
      "string.base": `Trường 'category' phải là một chuỗi.`,
      "string.empty": `Trường 'category' không được để trống.`,
      "string.pattern.base": `Trường 'category' phải là một chuỗi ObjectId hợp lệ.`,
    }),
  createdAt: Joi.date(),
});

/** ======================================================== */

const User = Joi.object({
  email: Joi.string().pattern(new RegExp(regex)).min(5).required().messages({
    "string.base": "Email phải là chuỗi",
    "string.empty": "Email không được để trống",
    "string.min": "Email ít nhất {#limit} ký tự",
    "string.email": `Email không hợp lệ.`,
    "string.required": "Email là bắt buộc",
    "any.required": "Email là bắt buộc",
    "string.pattern.base": "Email không đúng định dạng",
  }),
  password: Joi.string().min(5).required().messages({
    "string.base": "Password phải là chuỗi",
    "string.empty": "Password không được để trống",
    "string.min": "Password ít nhất {#limit} ký tự",
    "string.required": "Password là bắt buộc",
    "any.required": "Password là bắt buộc",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": `Mật khẩu xác nhận không giống với mật khẩu.`,
  }),
  createdAt: Joi.date(),
}).with("confirmPassword", "password");

/** ======================================================== */

const Category = Joi.object({
  name: Joi.string().min(5).required().messages({
    "string.base": "Danh mục phải là chuỗi",
    "string.empty": "Danh mục không được để trống",
    "string.min": "Danh mục ít nhất {#limit} ký tự",
    "string.required": "Danh mục là bắt buộc",
  }),
  description: Joi.string().min(5).messages({
    "string.base": "Mô tả sản phẩm phải là chuỗi",
    "string.empty": "Mô tả sản phẩm không được để trống",
    "string.min": "Mô tả sản phẩm ít nhất {#limit} ký tự",
  }),
  author: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.base": `Trường 'author' phải là một chuỗi.`,
      "string.empty": `Trường 'author' không được để trống.`,
      "string.pattern.base": `Trường 'author' phải là một chuỗi ObjectId hợp lệ.`,
      "any.required": `Trường 'author' là bắt buộc.`,
    }),
  createdAt: Joi.date(),
});

/** ======================================================== */

const validationProduct = (req, res, next) => {
  const { error, value } = Product.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error,
    });
  }
  req.body = value;
  next();
};

const validationProductUpdate = (req, res, next) => {
  const { error, value } = Product.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error,
    });
  }
  req.body = value;
  next();
};

const validationUser = (req, res, next) => {
  const { error, value } = User.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

const validationCategory = (req, res, next) => {
  const { error, value } = Category.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

export {
  validationProduct,
  validationProductUpdate,
  validationUser,
  validationCategory,
};
