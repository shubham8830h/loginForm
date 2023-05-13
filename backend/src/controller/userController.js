const { model } = require("mongoose");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email)
    return res.status(400).send({ status: false, msg: "email is required" });

  if (!password)
    return res.status(400).send({ status: false, msg: "password is required" });

  if (!name)
    return res.status(400).send({ status: false, msg: "password is required" });

  const newUser = new userModel({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 8),
  });

  const user = await newUser.save();
  // const token = jwt.sign(
  //   {
  //     userId: user._id.toString(),
  //   },
  //   process.env.PRIVATE_KEY
  // );

  res.send({
    _id: user.id,
    // token: token,
    name: user.name,
    email: user.email,
  });
};

const login = async (req, res) => {
  let data = req.body;
  const { email, password } = data;
  if (!email)
    return res.status(400).send({ status: false, msg: "email is required" });

  if (!password)
    return res.status(400).send({ status: false, msg: "password is required" });

  const user = await userModel.findOne({ email: email });
  if (!user)
    return res
      .status(400)
      .send({ status: false, msg: "Email is Invalid Please try again !!" });

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword)
    return res.status(400).send({
      status: false,
      msg: "Password is Invalid Please try again !!",
    });

  const token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    "private_key"
  );

  res.send({
    _id: user.id,
    token: token,
    name: user.name,
    email: user.email,
  });
};

module.exports = { register, login };
