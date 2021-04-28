const { User } = require("../DB/models");
const { Sequelize, Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
require("dotenv").config();
// const crypto = require("crypto");
// console.log(crypto.randomBytes(32).toString("hex"));

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existUser = await User.findOne({
      where: { userName: username },
    });
    if (existUser) {
      return res.status(409).send("Username already exist");
    }
    const existEmail = await User.findOne({
      where: { email: email },
    });
    if (existEmail) {
      return res.status(409).send("Email already exist");
    }
    const newUser = {
      userName: username,
      email: email,
      password: hashSync(password, genSaltSync(10)),
    };
    await User.create(newUser);
    delete newUser.password;
    const token = createToken(newUser);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: username });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ where: { email: email } });
    if (!existUser) {
      return res.status(404).send("Incorrect email or password");
    }
    const auth = compareSync(password, existUser.dataValues.password);
    if (!auth) {
      return res.status(404).send("Incorrect email or password");
    }
    const userToken = {
      userName: existUser.dataValues.userName,
      email: existUser.dataValues.email,
    };
    const token = createToken(userToken);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: userToken.userName });
  } catch (error) {}
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "logged_out", { maxAge: 1 });
  res.status(200).send("user logged out");
};
