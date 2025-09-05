const BigXClient = require("../src/index");

const bigx = new BigXClient(
  "YOUR_MERCHANT_API_KEY",
  "YOUR_SHOP_KEY",
  "YOUR_MERCHANT_SECRET"
);

(async () => {
  try {
    const invoice = await bigx.createInvoice(
      "ORDER-10023",
      150,
      "USDT",
      "TRC20",
      { description: "خرید تستی" }
    );
    console.log("Invoice created:", invoice);
    console.log("Redirect user to:", invoice.payment_url);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
})();
