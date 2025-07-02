const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, phone, firstName, lastName } = newUser;

    const checkUser = await User.findOne({
      email: email,
    });
    if (checkUser !== null) {
      return resolve({
        status: "ERR",
        message: "The email is already exist!",
      });
    }

    try {
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        email,
        password: hash,
        phone,
        firstName,
        lastName,
      });

      const access_token = await generalAccessToken({
        id: createdUser._id,
        isAdmin: createdUser.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        id: createdUser._id,
        isAdmin: createdUser.isAdmin,
      });

      createdUser.refresh_token = refresh_token;
      await createdUser.save();

      if (createdUser) {
        resolve({
          status: "OK",
          message: "Success",
          access_token,
          userInfo: {
            email: createdUser.email,
            firstName: createdUser.firstName || "NA",
            lastName: createdUser.lastName || "NA",
            phone: createdUser.phone || "NA",
            favorite: createdUser.favorite || [],
            cartSize: createdUser.cart.length || 0,
          }
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = ({ email, password, requireAdmin = false }) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Login attempt for email: ${email}, requireAdmin: ${requireAdmin}`);
      
      const checkUser = await User.findOne({ email }).lean(); 
      console.log(`User found:`, checkUser ? { 
        id: checkUser._id, 
        email: checkUser.email, 
        isAdmin: checkUser.isAdmin,
        isActive: checkUser.isActive 
      } : null);

      if (!checkUser) {
        return reject({
          status: 404,
          message: "Incorrect email or password"
        });
      }

      if (!checkUser.isActive) {
        console.log('Account deactivated');
        return reject({
          status: 401,
          message: "Account is deactivated, please contact support"
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        console.log('Password incorrect');
        return reject({
          status: 401,
          message: "Incorrect email or password"
        });
      }

      if (requireAdmin && !checkUser.isAdmin) {
        console.log(`Admin access denied. User isAdmin: ${checkUser.isAdmin}`);
        return reject({
          status: 403,
          message: "Admin privilege is required"
        });
      }

      console.log('Password verified, generating tokens...');

      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      console.log('Login successful');

      resolve({
        status: "OK",
        message: requireAdmin ? "Admin login successful" : "Login successful",
        access_token,
        refresh_token,
        userInfo: {
          _id: checkUser._id,
          email: checkUser.email,
          firstName: checkUser.firstName,
          lastName: checkUser.lastName,
          img: checkUser.img || null,
          phone: checkUser.phone || null,
          favorite: checkUser.favorite || [],
          cartSize: checkUser.cart?.length || 0,
          isAdmin: checkUser.isAdmin,
          isActive: checkUser.isActive,
          totalSpent: checkUser.totalSpent || 0,  
          createdAt: checkUser.createdAt, 
        },
      });
    } catch (e) {
      console.error('Login service error:', e);
      reject(e);
    }
  });
};

const adminLoginUser = ({ email, password }) => {
  console.log('Admin login service called');
  return loginUser({ email, password, requireAdmin: true });
};

const uploadImageToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    if (!file?.buffer || !cloudinary?.uploader) {
      return reject(new Error("Cloudinary config error or invalid file"));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "user_avatars",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      },
      (err, result) => {
        if (err) return reject(new Error("Cloudinary upload failed: " + err.message));
        resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};

const deleteImageFromCloudinary = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if (!imageUrl) return resolve();

    const publicId = imageUrl
      .split('/')
      .slice(-2)
      .join('/')
      .replace(/\.[^/.]+$/, ""); 

    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const updateUserById = async (id, data, file) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { status: "ERR", message: "User not found" };
    }

    if (file) {
      if (user.img) await deleteImageFromCloudinary(user.img);
      data.img = await uploadImageToCloudinary(file);
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    return {
      status: "OK",
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.error("Update user error:", error);
    return { status: "ERR", message: error.message };
  }
};

const updateUser = (id, data, file) => updateUserById(id, data, file);
const adminUpdateUser = (id, data, file) => updateUserById(id, data, file);

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return {
        status: "ERR",
        message: "User not found",
      };
    }

    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match) {
      return {
        status: "ERR",
        message: "Incorrect old password",
      };
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return {
      status: "OK",
      message: "Password updated successfully",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      console.log("checkUser", checkUser);
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined!",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = (limitUser, page, excludeUserId = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = excludeUserId ? { _id: { $ne: excludeUserId } } : {};
      
      const totalUser = await User.countDocuments(query);
      // console.log("limitUser", limitUser);
      // console.log("excludeUserId", excludeUserId);
      
      const allUser = await User.find(query)
        .limit(limitUser)
        .skip(page * limitUser);
        
      resolve({
        status: "OK",
        message: "Get all user success",
        data: allUser,
        totalUser: totalUser,
        currentPage: Number(page + 1),
        totalPage: Math.ceil(totalUser / Number(limitUser)),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "OK",
          message: "The user is not defined!",
        });
      }

      resolve({
        status: "OK",
        message: "Get Detail user success",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUserFavorites = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: userId,
      }).populate("favorite");

      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined!",
        });
      }

      const favoriteItems = user.favorite.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.images[0],
        color: item.variants[0].color,
        size: item.variants[0].sizes[0].size,
      }));

      resolve({
        status: "OK",
        message: "Get user favorite success",
        data: favoriteItems,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const handleFavoriteAction = (action, userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: userId,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined!",
        });
      }

      if (action == "add") {
        const checkProduct = user.favorite.find(
          (item) => item.toString() === productId.toString()
        );
        console.log("checkProduct", checkProduct);

        if (checkProduct !== undefined) {
          console.log("Product is already in favorite list");
          return resolve({
            status: "ERR",
            message: "The product is already in favorite list!",
          });
        }

        user.favorite.push(productId);
        await user.save();

        resolve({
          status: "OK",
          message: "Add favorite success",
        });
      } else {
        const checkProduct = user.favorite.find(
          (item) => item.toString() === productId
        );

        if (checkProduct === undefined) {
          resolve({
            status: "ERR",
            message: "The product is not in favorite list!",
          });
        }

        user.favorite = user.favorite.filter(
          (item) => item.toString() !== productId
        );
        await user.save();

        resolve({
          status: "OK",
          message: "Remove favorite success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleCartAction = async (action, userId, productId, color, size, quantity) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        status: "ERR",
        message: "User not found",
      };
    }

    const cartItem = user.cart.find(
      (item) =>
        item.product.toString() === productId.toString() &&
        item.color === color &&
        item.size === size
    );

    switch (action) {
      case "add":
        if (cartItem) {
          cartItem.quantity += quantity;
        } else {
          user.cart.push({ product: productId, color, size, quantity });
        }
        break;

      case "remove":
        if (!cartItem) {
          return {
            status: "ERR",
            message: "Product not found in cart",
          };
        }
        user.cart = user.cart.filter(
          (item) =>
            !(
              item.product.toString() === productId.toString() &&
              item.color === color &&
              item.size === size
            )
        );
        break;

      case "update":
        if (!cartItem) {
          return {
            status: "ERR",
            message: "Product not found in cart",
          };
        }
        cartItem.quantity = quantity;
        break;

      default:
        return {
          status: "ERR",
          message: "Invalid action",
        };
    }

    await user.save();
    return {
      status: "OK",
      message: `${action} cart success`,
      cart: user.cart,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const getUserCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: userId,
      }).populate({
        path: "cart.product",
        select: "price name images",
      });

      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined!",
        });
      }

      const cartItems = user.cart.map((item) => {
        return {
          product: item.product,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        };
      });

      resolve({
        status: "OK",
        message: "Get user cart success",
        data: cartItems,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDashboard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await User.countDocuments({ isAdmin: false });
      const totalProduct = await Product.countDocuments();
      const totalOrder = await Order.countDocuments();

      const orders = await Order.find({
        status: "completed",
      }).populate({
        path: "products.productId",
        select: "price",
      });

      const totalRevenue = orders.reduce((acc, order) => {
        const totalOrder = order.products.reduce((acc, product) => {
          return acc + product.productId.price * product.quantity;
        }, 0);
        return acc + totalOrder;
      }, 0);

      const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate({
          path: "userId",
          select: "phone email",
        })
        .populate({
          path: "products.productId",
          select: "price name images",
        });

      const addedTotalRecentOrder = recentOrders.map((order) => {
        const total = order.products.reduce((acc, product) => {
          return acc + product.productId.price * product.quantity;
        }, 0);
        return {
          ...order._doc,
          total,
        };
      });

      const refinedRecentOrder = addedTotalRecentOrder.map((order) => ({
        id: order._id,
        customerPhone: order.userId.phone,
        customerEmail: order.userId.email,
        total: order.total + (order.delivery === "standard" ? 30000 : 50000),
        date: order.createdAt,
        status: order.status,
      }));

      resolve({
        status: "OK",
        message: "Get dashboard success",
        data: {
          totalUser,
          totalProduct,
          totalOrder,
          totalRevenue,
          recentOrders: refinedRecentOrder,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  adminLoginUser,
  updateUserById,
  updateUser,
  adminUpdateUser,
  changePassword,
  deleteUser,
  getAllUser,
  getDetailUser,
  getUserFavorites,
  handleFavoriteAction,
  getUserCart,
  handleCartAction,
  getDashboard,
};
