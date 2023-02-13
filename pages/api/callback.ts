import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Run the middleware
    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
    const { id } = req.query
    if (req.method === 'POST' && typeof (id) === "string") {
      console.log("payment successful")
      console.log(req.body.Body)
      const data = {
        paymentSessionId: id,
        transactionId: req.body.Body.stkCallback.CheckoutRequestID,
        state: req.body.Body.stkCallback.ResultCode === 0 ? "processed" : "failed",
        error: {
          code: "transaction_failed",
          message: req.body.Body.stkCallback.ResultDesc
        }
      }
      const response = await fetch("https://payment.snipcart.com/api/private/custom-payment-gateway/payment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PRIMARY_SECRET_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      const textResponse = await response.text()
      console.log(textResponse)
      if (response.ok) {
        const body = await response.json()
        res.redirect(body.returnUrl)
      }
      res.status(200).send("THANK YOU SAFARICOM")
    } else {
      res.status(400).json([{ error: 'Request sent Incorrectly' }]);
    }
  } catch (er) {
    res.status(500).json({ error: er })
  }

}
