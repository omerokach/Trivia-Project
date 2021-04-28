const { Sequelize, Op } = require("sequelize");
require("dotenv").config();
const { User } = require("../DB/models");
const bcrypt = require("bcrypt");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// console.log(crypto.randomBytes(32).toString("hex"));

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signUp_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isUsernameExist = await User.findOne({
      where: { userName: username },
    });
    const isEmailExist = await User.findOne({ where: { email: email } });

    if (isUsernameExist) {
      return res.status(409).send("Username already exist");
    }
    if (isEmailExist) {
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
    return res.status(201).json({ user: username });
  } catch (error) {
    return res.status(500).send();
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({
      where: { email: email },
    });
    if (!existUser) {
      return res.status(404).send("Incorrect email or password");
    }
    const auth = compareSync(
      existUser.dataValues.password,
      process.env.SECRET_KEY
    );
    if (!auth) {
      return res.status(404).send("Incorrect email or password");
    }
    const userToken = {
      username: existUser.dataValues.username,
      email: existUser.dataValues.email,
    };
    const token = createToken(userToken);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(201).json({ user: userToken.username });
  } catch (error) {
    res.status(500).send(error);
  }
};
