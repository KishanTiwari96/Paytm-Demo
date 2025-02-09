const express = require("express");
const cors = require("cors")
const mainRouter = require("./routes/index")
const app = express();
const jsonwebtoken = require("jsonwebtoken")

app.use(cors({
    origin: 'https://paytm-demo-frontend.vercel.app', 
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json());
app.use("/api/v1",mainRouter);

app.listen(3000)
