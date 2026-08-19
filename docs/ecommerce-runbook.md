# Store and Firestore runbook

## Local setup

1. Copy `.env.example` to `.env`.
2. Set the Firebase Admin credentials. The pickup location is defined in the store page and checkout route.
3. Run `npm run dev` and open `http://localhost:3000/store`.
4. Submit an order. With Firebase configured, verify a new document in Firestore collection `commerce_orders` has `paymentStatus: "pending"`.

Without Firebase variables, the app uses a temporary in-memory order store. That is suitable only for UI smoke tests because records disappear when the server restarts.

## Firebase / Firestore setup

1. Create a Firebase project, then create a Cloud Firestore database in **Production mode**.
2. In Google Cloud Console for that project, create a dedicated service account for this website. Grant only the permissions it needs to read and write Firestore.
3. Create a service-account key and copy its project ID, client email, and private key into local `.env` and your deployment platform's encrypted environment variables.
4. Use the configuration in `.env.example`; quote the private key and preserve each `\n` escape.
5. Do not expose any Firebase credential in a `NEXT_PUBLIC_*` variable or commit `.env`.

This app uses the Firebase Admin SDK only on the server. Keep browser Firestore access denied unless a future feature explicitly needs it; Admin SDK access is governed by Google Cloud IAM rather than Firestore Rules.

## Payment confirmation integration

Set a long random `ORDER_CONFIRMATION_SECRET` in the hosting environment and in Apps Script Properties. Once the existing Apps Script verifies a payment, it calls the confirmation endpoint documented in `docs/ecommerce.md` and then sends the buyer the payment-received email.

Test this endpoint locally after creating an order:

```powershell
$headers = @{ Authorization = "Bearer <ORDER_CONFIRMATION_SECRET>"; "Content-Type" = "application/json" }
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/commerce/orders/confirm-payment -Headers $headers -Body '{"orderId":"<ORDER_ID>","paymentReference":"local-test"}'
```

Verify the order changes from `pending` to `paid`. Repeating the same request should succeed without changing it again.
