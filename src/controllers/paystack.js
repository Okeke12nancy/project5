const logger = require("../helpers/logger");

class PaystackController {
  async initPayment(req, res) {
    try {
      const { amount, email, fullname, phone_number } = req.body;
      const response = await paystack.intializeTransaction(
        amount,
        email,
        fullname,
        phone_number
      );
      return handleResponse(200, response.message, response.data, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  // Create Transaction History
  async transactionHistory(req, res) {
    const response = JSON.parse(body);
    const transaction = await new TransactionModel({
      userDetails: user._id,
      transactionType: "deposit",
      transactionAmount: amount,
      transactionStatus: "pending",
      transactionDescription: "Payment for Order",
      transactionReference: response.data.reference || "",
    });

    // Save Transaction to Database
    await this.transactionHistory.save();
  }

  async verifyPayment(req, res) {
    try {
      const { reference } = req.params;
      const response = await paystack.verifyTransaction(reference);
      return handleResponse(200, response.message, response.data, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
}

module.exports = new PaystackController();
