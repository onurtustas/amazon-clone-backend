const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("*stripeKey*");

// API

// API Config
const app = express();
// MiddleWares
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  next();
});
app.use(cors({ origin: true }));
app.use(express.json());
app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  next();
});
// API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment request received", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// Listen Commands

exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/challange-dc130/us-central1/api
