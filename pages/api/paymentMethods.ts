import type { NextApiRequest, NextApiResponse } from 'next'
// import NextCors from 'nextjs-cors'

// type Data = {
//   id?:string
//   name?:string
//   checkoutUrl?:string
//   error?:string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data[]>
// ) {
//   // Run the middleware
//   await NextCors(req, res, {
//     // Options
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     origin: '*',
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   })

//   if (req.method === 'POST') {
//     const publicToken = req.body.publicToken
//     const response = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${publicToken}`)
//     if (response.ok) {
//       let paymentMethodList = [{
//         id: 'M-pesa_gateway',
//         name: 'M-Pesa gateway',
//         checkoutUrl: 'https://dukamoto.vercel.app/paymentCheckout',
//       }]
//       res.status(200).json(paymentMethodList)
//     } else {
//       res.status(403).json([{error:'Request not allowed'}]);
//     }
//   } else {
//     res.status(400).json([{error:'Request sent Incorrectly'}]);
//   }
// }