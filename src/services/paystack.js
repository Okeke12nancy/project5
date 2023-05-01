import axios from "axios";

class PaystackPaymentService {
  constructor() {
    this.paystackBaseUrl = process.env.PAYSTACK_BASE_URL;
    this.apiKey = process.env.PAYSTACK_SECRET_KEY;
  }

  async initializeTransaction(amount, email, fullname, phone_number) {
    try {
      const url = `${this.paystackBaseUrl}/transaction/initialize`;

      const body = {
        amount,
        email,
        fullname,
        metadata: {
          custom_fields: [
            {
              display_name: "phone number",
              variable_name: "phone_number",
              value: phone_number,
            },
          ],
        },
      };
      const config = {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(url, body, config);
      return {
        message: data.message,
        status: data.status,
        data: data.data,
      };
    } catch (error) {
      const errRespMsg = error.response
        ? error.response.data.message
        : "failed to initialize transaction";
      return {
        message: errRespMsg,
        status: error.response.data.status,
        data: null,
      };
    }
  }

  async verifyTransaction(reference) {
    try {
      const url = `${
        this.paystackBaseUrl
      }/transaction/verify/${encodeURIComponent(reference)}`;

      const config = {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(url, config);

      return {
        message: data.message,
        status: data.status,
        data: data.data,
      };
    } catch (erro) {
      const errRespMsg = error.response
        ? error.response.data.message
        : "failed to verify transaction";
      return {
        message: errRespMsg,
        status: error.response.data.status,
        data: null,
      };
    }
  }
}

export default new PaystackPaymentService();
