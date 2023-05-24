const express = require("express");
const paymentRouter = express.Router();

const PaystackController = require("../controllers/paystack");

// Create a new account
paymentRouter.post("paystack/pay", PaystackController.initPayment);

paymentRouter.get(
  "/paystack/verify/:reference",

  PaystackController.verifyPayment
);

module.exports = paymentRouter;
