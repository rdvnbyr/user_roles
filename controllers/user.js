const User = require("../models/User");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    if (password !== user.password) {
      const error = new Error("password does not match");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json(user);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const createUser = new User({
      username,
      password,
      role: "admin",
      userTools: [],
    });
    await createUser.save();
    res.status(200).json(createUser);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { list, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    user.userTools.push(list);
    const updateUser = new User(user);
    await updateUser.save();
    res.status(200).json([]);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ ...user, password: undefined });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
