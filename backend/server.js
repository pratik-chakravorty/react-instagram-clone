const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");

// instantiate
const app = express();

// connect to DB
connectDB();

app.use(express.json());
app.use(cors());

// routes
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));
