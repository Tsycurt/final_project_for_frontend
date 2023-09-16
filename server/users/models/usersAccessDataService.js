const DB = process.env.DB || "MONGODB";
const User = require("./mongodb/User");
const lodash = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");

const registerUser = async normalizedUser => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user = await user.save();

      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      if (!user)
        throw new Error("Authentication Error: Invalid email or password");

      if (user.attempts === 3)
        throw new Error("Authentication Error: You have been blocked for 24 hours");

      const validPassword = comparePassword(password, user.password);
      if (!validPassword) {

        let objToUpdate = {
          attempts: user.attempts + 1
        };
  
        if (objToUpdate.attempts === 3) {
          let date = new Date();
          let time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
          
          date.setDate(date.getDate() + 1);
          objToUpdate.unblocked_date = date;
          objToUpdate.unblocked_time = time;
        }
        const upUser = await user.update(objToUpdate);
        throw new Error(objToUpdate.attempts === 3 ? "Authentication Error: You have been blocked for 24 hours" : "Authentication Error: Invalid email or password");
      }
        
      const upUser = await user.update({ attempts: 0 });
      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const getUser = async userId => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      });
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card update not in mongodb");
};

const changeUserBusinessStatus = async userId => {
  if (DB === "MONGODB") {
    try {
      const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
      const user = await User.findByIdAndUpdate(userId, pipeline, {
        new: true,
      }).select(["-password", "-__v"]);

      if (!user)
        throw new Error(
          "Could not update this user isBusiness status because a user with this ID cannot be found in the database"
        );

      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card liked not in mongodb");
};

const deleteUser = async userId => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findByIdAndDelete(userId, {
        password: 0,
        __v: 0,
      });

      if (!user)
        throw new Error(
          "Could not delete this user because a user with this ID cannot be found in the database"
        );
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
