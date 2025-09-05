# BigX SDK (Node.js)

SDK رسمی برای درگاه پرداخت **بیگ‌ایکس** 
با استفاده از این کتابخانه می‌توانید به راحتی برای سایت یا نرم افزار یا ربات تلگرامی خود درگاه پرداخت ارز دیجیتال اضافه کنید، وضعیت پرداخت را بررسی کنید و وبهوک‌ها را مدیریت کنید.

---

## 📦 نصب
```bash
npm install bigx-sdk
```

یا در حالت توسعه:
```bash
git clone https://github.com/bigxpay/bigx-sdk-js.git
cd bigx-sdk-js
npm install
```

---

## ⚡ شروع سریع (Quick Start)
```js
const BigXClient = require("bigx-sdk");

const bigx = new BigXClient(
  "YOUR_MERCHANT_API_KEY",
  "YOUR_SHOP_KEY",
  "YOUR_MERCHANT_SECRET"
);

(async () => {
  const invoice = await bigx.createInvoice(
    "ORDER-10023",
    150,
    "USDT",
    "TRC20",
    { description: "خرید تستی" }
  );
  console.log("Redirect user to:", invoice.payment_url);
})();
```

---

## 📖 مستندات متدها

### `createInvoice(orderId, amount, currency, network, options)`
ایجاد یک فاکتور جدید.  
- `orderId` → شماره سفارش داخلی شما  
- `amount` → مقدار یا تعداد توکن  
- `currency` → ارز (مثلا USDT)  
- `network` → شبکه بلاکچین (مثلا TRC20)  
- `options` → فیلدهای اختیاری مثل `mobile`, `description`  

### `getInvoice(invoiceId)`
دریافت وضعیت یک فاکتور بر اساس `invoice_id`.  

### `verifyWebhook(signature, body)`
اعتبارسنجی وبهوک برگشتی از BigX با استفاده از HMAC-SHA256.  

---

## 📂 نمونه کدها

برای دیدن مثال‌های کامل‌تر به پوشه [`examples/`](./examples) مراجعه کنید:  
- [ایجاد فاکتور](./examples/createInvoice.js)  
- [بررسی وضعیت فاکتور](./examples/getInvoice.js)  
- [مدیریت وبهوک](./examples/webhook.js)  

---

## 🔔 وبهوک (Callback)

بعد از پرداخت یا لغو تراکنش، BigX به آدرس `callback_url` شما درخواست POST می‌زند.  
برای بررسی امضا:

```js
app.post("/callback", express.json(), (req, res) => {
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
```

---

## 🧪 توسعه و تست

برای اجرای تست‌ها:
```bash
npm test
```

---

## 📜 لایسنس

MIT  

© 2025 BigX

