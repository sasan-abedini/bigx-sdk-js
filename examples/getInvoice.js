const BigXClient = require("../src/index");

const bigx = new BigXClient("API_KEY", "SHOP_KEY", "SECRET");

(async () => {
  const status = await bigx.getInvoice("bigx_abcd1234");
  console.log("Invoice Status:", status);
})();
