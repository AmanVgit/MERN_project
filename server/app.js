const dotenv = require("dotenv");
const express = require("express")
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router")
const PORT = 6010

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/uploads",express.static("./uploads"));

app.use(router);

app.listen(PORT,()=>{
    console.log(`Server Started at port no ${PORT}`);
})