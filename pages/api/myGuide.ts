import type { NextApiRequest, NextApiResponse } from 'next'

// receive a post request to your url and return a list of payments
// router.post("/paymetMethod", (req, res)=>{
//     const token = req.body.publicToken
//     res.json(
//         [
//             {
//               "id": "mpesa",
//               "name": "Mpesa",
//               "checkoutUrl": "https://dukamoto.vercel.app/mpesa",
//             },
//             {
//               "id": "airtel",
//               "name": "Airtel Money",
//               "checkoutUrl": "https://dukamoto.vercel.app/airtel",
//               "iconUrl": "https://dukamoto.vercel.app/airtel/airtel.png"
//             }
//           ]
//     )
//   });

// create a get request to the a payment session after validating request

// /mpesa will be a react component

// router.get("/mpesa", (req, res) => {
//     fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${req.body.publicToken}`).then(res => {
//         if (!res.ok) {
//             //not a valid request
//             return
//         }
//         fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${req.body.publicToken}`).then(res => {
//             // fetch customers number and send safaricom mpesa prompt

//             // wait for customer to pay and make a post request to your payment url
//         })
//     })

// })






// create a post payment endpoint that indicates if payment was successfull or it failed
