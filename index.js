const express = require("express")
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/products")

/* Parser */
app.use(express.json())
/* Routes */
app.use("/products", productsRouter)

/*Mongo db connection*/
mongoose.connect("mongodb+srv://admin:koray123@cluster0.yq5lq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to database")
})
.catch((error)=>{
    console.log(error)
})
app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(5001, () => {
    console.log("Server is Running on PORT 5001");
});

//cvS5MpJ6O1Ws8zgG