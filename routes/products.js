const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {
  res.send(`fetch product ${req.params.id}`);
});

router.post("/", (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  product
    .save()
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.json(error);
    });
});
router.put("/:id", (req, res) => {
  res.send(`update product ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`delete product ${req.params.id}`);
});

module.exports = router;
