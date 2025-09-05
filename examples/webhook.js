const express = require("express");
const bodyParser = require("body-parser");
const BigXClient = require("../src/index");

const app = express();
const bigx = new BigXClient("API_KEY", "SHOP_KEY", "SECRET");

app.use(bodyParser.json());

app.post("/callback", (req, res) => {
  const signature = req.headers["x-signature"];
  const body = JSON.stringify(req.body);

  if (bigx.verifyWebhook(signature, body)) {
    console.log("✅ پرداخت معتبر:", req.body);
    res.json({ ok: true });
  } else {
    console.log("❌ امضا نامعتبر");
    res.status(400).json({ error: "Invalid signature" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
