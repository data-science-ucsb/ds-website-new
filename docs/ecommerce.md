# Store checkout

The store creates pickup orders only. It does not collect payment details, display payment-account information, or integrate with payment providers.

1. A guest adds products to a browser-persisted cart and submits their name, email, and pickup notes.
2. The server validates products and prices, then saves an order in Firestore with `paymentStatus: pending`.
3. The club's separate payment-confirmation process verifies payment.
4. The Google Apps Script calls the protected confirmation endpoint and sends the confirmation email to the buyer.

## Required environment variables

```env
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
ORDER_CONFIRMATION_SECRET=a-long-random-secret
```

`ORDER_CONFIRMATION_SECRET` is server-only. Do not prefix it with `NEXT_PUBLIC_` or commit it.

## Apps Script confirmation endpoint

After the script has independently confirmed payment, it should send:

```text
POST https://your-domain.com/api/commerce/orders/confirm-payment
Authorization: Bearer <ORDER_CONFIRMATION_SECRET>
Content-Type: application/json

{"orderId":"DS-20260818-ABC123","paymentReference":"gmail-message-id-or-other-audit-reference"}
```

The route changes a pending order to `paid`. It is idempotent: repeating a successful confirmation returns the paid order without changing it again.

Then let the Apps Script email the customer:

> Your payment has been received and your membership confirmation will be processed shortly.

Keep the secret in Apps Script Properties, not in the script source. The successful response contains the verified order, including `order.customerInfo.email`, which the Apps Script can use for the confirmation email. Do not put an email address in the confirmation request.
