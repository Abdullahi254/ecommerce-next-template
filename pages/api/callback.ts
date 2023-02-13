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
      if (req.body.Body.stkCallback.ResultCode === 0) {
        console.log("payment successful")
        console.log(req.body.Body)
        // const data = {
        //   paymentSessionId: id,
        //   transactionId: req.body.Body.stkCallback.CheckoutRequestID,
        //   state: "processed",
        // }
        // await fetch("/api/listener", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(data)
        // })
      } else {
        console.log("payment failed")
        console.log(req.body.Body)
        // const data = {
        //   paymentSessionId: id,
        //   transactionId: req.body.Body.stkCallback.CheckoutRequestID,
        //   state: "failed",
        //   error: {
        //     code: "payment_failed",
        //     message: "Request cancelled by user."
        //   }
        // }
        // await fetch("/api/listener", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(data)
        // })
      }
      res.status(200).send("THANK YOU SAFARICOM")
    } else {
      res.status(400).json([{ error: 'Request sent Incorrectly' }]);
    }
  } catch (er) {
    res.status(500).json({ error: er })
  }

}


//sent it to a post endpoint
//keep requeting the end point --- data is in the req