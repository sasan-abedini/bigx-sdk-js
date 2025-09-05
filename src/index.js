const crypto = require("crypto");
const axios = require("axios");

class BigXClient {
  constructor(apiKey, shopKey, secret, baseUrl = "https://bigx.ir/api/v1") {
    this.apiKey = apiKey;
    this.shopKey = shopKey;
    this.secret = secret;
    this.baseUrl = baseUrl;
  }

  async createInvoice(orderId, amount, currency, network, options = {}) {
    const payload = { order_id: orderId, amount, currency, network, ...options };

    const res = await axios.post(`${this.baseUrl}/invoices/create`, payload, {
      headers: {
        "X-API-KEY": this.apiKey,
        "X-SHOP-KEY": this.shopKey,
        "Content-Type": "application/json"
      }
    });
    return res.data;
  }

  async getInvoice(invoiceId) {
    const res = await axios.get(`${this.baseUrl}/invoices/${invoiceId}`, {
      headers: {
        "X-API-KEY": this.apiKey,
        "X-SHOP-KEY": this.shopKey
      }
    });
    return res.data;
  }

  verifyWebhook(signature, body) {
    const hmac = crypto
      .createHmac("sha256", this.secret)
      .update(body, "utf8")
      .digest("hex");
    return hmac === signature;
  }
}

module.exports = BigXClient;
