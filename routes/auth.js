const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Username, email veya password eksikse hata döndür
  if (!username || !email || !password) {
    return res.status(400).send("Username, email and password are required");
  }

  // Aynı kullanıcı adı veya email ile kayıt olmayı engelle
  User.findOne({ $or: [{ username: username }, { email: email }] })
    .then((userExisting) => {
      if (userExisting) {
        return res.status(400).send("Username or email already in use");
      }

      // Şifreyi hashleyin
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      // Yeni kullanıcı oluşturun ve veritabanına kaydedin
      const newUser = new User({
        username,
        email,
        password: hashedPassword, // Düzgün yazılmış haliyle hashedPassword kullanılıyor
      });

      return newUser.save();
    })
    .then((user) => {
      res.status(201).send("User successfully saved"); // Kaydedilen kullanıcıyı JSON olarak geri döndürün
    })
    .catch((error) => {
      if (!res.headersSent) {
        // Yanıtın daha önce gönderilip gönderilmediğini kontrol edin
        res.status(500).send(error.message);
      }
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }
  let foundUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        return res.status(401).send("Incorrect password or Email adress");
      }

      const token = jwt.sign(
        { id: foundUser._id, email: foundUser.email },
        "Secret key",
      );
      res.header("Authorization", token).json({ accessToken: token });
    })
    .catch((error) => {
      res.status(500).send("Error logging in: " + error.message);
    });
});

module.exports = router;
