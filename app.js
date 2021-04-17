const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const authRouter = require("./routers/auth-router");
const serviceRouter = require("./routers/service-router");
const garageRouter = require("./routers/garage-router");
const bookingRouter = require("./routers/booking-router");
const userRouter = require("./routers/user-router");
const generalRouter = require("./routers/general-router");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Welcome To Car Service Web API",
        data: {}
    });
});

app.use("/api/a", authRouter);
app.use("/api/s", serviceRouter);
app.use("/api/g", garageRouter);
app.use("/api/b", bookingRouter);
app.use("/api/u", userRouter);
app.use("/api/general", generalRouter);

app.listen(port, () => console.log("Running on port", port));