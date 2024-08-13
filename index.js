const express = require("express")
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/products")

/* Parser */
app.use(express.json())
/* Routes */
app.use("/products", productsRouter)

/*Mongo db connection*/
mongoose.connect("mongodb://localhost:27017/test")
.then(() => {
    console.log("Connected to database")
})
.catch((error)=>{
    console.log(error)
})
app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(5000, () => {
    console.log("Server is Running on PORT 5000");
});

//yYMxT8SqKpNU4MxO