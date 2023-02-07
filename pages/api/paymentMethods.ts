import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  if (req.method === 'POST') {
    const publicToken = req.body.publicToken
    const response = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${publicToken}`)
    if (response.ok) {
      let paymentMethodList = [{
        id: 'M-pesa_gateway',
        name: 'M-Pesa gateway',
        checkoutUrl: 'https://dukamoto.vercel.app/paymentCheckout',
      }]
      res.status(200).json(JSON.stringify(paymentMethodList))
    } else {
      res.status(403).send('Request not allowed');
    }
  } else {
    res.status(400).send('Request sent Incorrectly');
  }
}