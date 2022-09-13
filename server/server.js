// console.log("App Start");
const express = require("express");
const app = express();
const cors = require("cors"); //to conect api frontend to backend
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
var jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.static(path.join(__dirname + "/public")));
app.use(morgan("dev"));
app.use(express.json()); //to know the json in terminal

app.use(cors()); //to connect api front end and back end

app.use(express.urlencoded({ extended: true }));

const loginSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    required: true,
  },
});

const blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogMessage: String,
});

const registerInfo = mongoose.model("register", loginSchema);
const blogRegister = mongoose.model("blogDetails", blogSchema);

app.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);
    let isEmailExist = await registerInfo.findOne({
      email: req.body.email,
    });
    if (isEmailExist) {
      res.status(500).json({ success: false, message: "email already exist" });
    } else {
      let genSalt = await bcrypt.genSalt(20);
      let hashpassword = await bcrypt.hash(req.body.password, genSalt);
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const password = hashpassword;

      const result = await registerInfo({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: "user",
      });
      result.save();
      console.log(result);
      res.status(200).json({ success: true, person: result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
});

app.get("/api/user/get", (req, res) => {
  registerInfo.find({}, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/api/user/update/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log(updateData);
  try {
    await registerInfo.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, id, updateData });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error" });
  }
});

app.delete("/api/user/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await registerInfo.findByIdAndDelete({ _id: id });
    res.status(200).json({ success: true, id: id });
  } catch (error) {
    console.log("deleted");
    res.status(500).json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    let isEmailExist = await registerInfo.findOne({
      email: req.body.email,
    });
    console.log(req.body.email);
    if (isEmailExist) {
      console.log(isEmailExist);

      let decode = bcrypt.compare(req.body.password, isEmailExist.password);
      if (decode) {
        console.log("decode", decode);
        // jwt
        var token = jwt.sign(
          { id: isEmailExist._id, role: isEmailExist.role },
          "secretkey"
        );

        res.status(201).json({ success: true, token: token });
      } else {
        res.status(401).json({ success: false, message: "password incorrect" });
      }
    } else {
      res.status(401).json({ success: false, message: "unAuthorized" });
    }
    // res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

// ======  Blog Api =============

app.post("/api/blog", async (req, res) => {
  const blogData = req.body;
  await blogRegister(blogData).save();
  console.log(blogData);
  try {
    res.status(200).json({ success: true, blogData });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

app.get("/api/blog/get", async (req, res) => {
  try {
    blogRegister.find({}, (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete("/api/blog/delete/:id", async (req, res) => {
  const id = req.params.id;
  await blogRegister.findByIdAndDelete({ _id: id });
  console.log(id);
  try {
    res.status(200).json({ success: true, id: id });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

app.put("/api/blog/update/:id", async (req, res) => {
  const id = req.params.id;
  const bodyData = req.body;
  // console.log(id, bodyData);
  try {
    await blogRegister.findByIdAndUpdate(id, bodyData, { new: true });
    res.status(200).json({ success: true, id, bodyData });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT;

mongoose
  .connect(
    // "mongodb+srv://ratheesh:ratheesh@cluster0.nhiyjv8.mongodb.net/MERN",
    "mongodb+srv://ratheesh:ratheesh@cluster0.nhiyjv8.mongodb.net/MERN?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/MERN",
    { useNewUrlParser: true, useUnifiedTopology: true }
    // (err) => {
    //   if (!err) {
    //     console.log("db connected");
    //   } else {
    //     console.log("db error");
    //   }
    // }
  )
  .then(() =>
    app.listen(PORT || 5000, () => {
      console.log(`server is started in ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
