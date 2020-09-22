const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require('./utils/appError');
const kbankRouter = require('./kbank/kbankRoute');

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "1mb", extended: false }));
app.use(bodyParser.json({ limit: "1mb" }));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/rates', kbankRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

module.exports = app;


