const connection = require("../mongodb/connection");
const registermodel = require("./userModel");

const userQueries = {
  insertUser: (req, res) => {
    let userObj = {
      email: req.body.email,
      password: req.body.password,
    };
    registermodel.create(userObj);
    return res.json({
      data: [userObj],
      success: true,
      msg: "User Registered",
    });
  },
};
module.exports = userQueries;
