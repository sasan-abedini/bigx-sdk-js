const BigXClient = require("../src/index");

const client = new BigXClient("apiKey", "shopKey", "secret");

const payload = JSON.stringify({
  invoice_id: "bigx123",
  status: "confirmed",
  amount_paid: 150
});

// ساخت امضا
const crypto = require("crypto");
const signature = crypto
  .createHmac("sha256", "secret")
  .update(payload, "utf8")
  .digest("hex");

console.log("Verify:", client.verifyWebhook(signature, payload)); // true
