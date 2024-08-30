const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products); // Tüm ürünleri JSON formatında döndür
    })
    .catch((error) => {
      res.status(500).send("Error fetching products: " + error.message);
    });
});

router.get("/:id", (req, res) => {
  res.send(`fetch product ${req.params.id}`);
});

router.post("/", authMiddleware, (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    user: req.userID,
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
router.put("/:id", authMiddleware, (req, res) => {
  const updateData = req.body;
  Product.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true })
    .then((updatedProduct) => {
      if (!updateData) {
        return res
          .status(404)
          .send(`Product with ID ${req.params.id} not found.`);
      }
      
      if (updatedProduct.user.toString() !== req.userID) {
        return res
          .status(403)
          .send("You are not authorized to update this product.");
      }
      res.json(updatedProduct);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/:id", authMiddleware, (req, res) => {
  const productID = req.params.id;
  Product.findById(productID)
    .then((product) => {
      if (!product) {
        return res.status(404).send(`Product with ID ${productID} not found.`);
      }
      console.log(product.user)
      if (product.user.toString() !== req.userID) {
        return res
          .status(403)
          .send("You are not authorized to delete this product");
      }
      return Product.findByIdAndDelete(productID);
    })
    .then((deletedProduct) => {
      const deleteID = deletedProduct._id;
      res.send(`Product with ID ${deleteID} was deleted successfully`);
    })
    .catch((error) => {
      if(!res.headersSent){

        res.status(500).send("Error deleting produt: " + error.message);
      }
    });
});

module.exports = router;
