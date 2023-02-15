import type { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            // getting auth token
            const tokenUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
            const stkUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
            const buff = Buffer.from(process.env.NEXT_SAFARICOM_CONSUMER_KEY + ":" +
                process.env.NEXT_SAFARICOM_CONSUMER_SECRET);
            const auth = "Basic " + buff.toString("base64");
            const tokenRes = await fetch(tokenUrl, {
                method: 'GET',
                headers: {
                    "Authorization": auth
                }
            })
            const stringTokenRes = await tokenRes.text()
            const accessToken = JSON.parse(stringTokenRes).access_token
            const shortCode = process.env.NEXT_SAFARICOM_SHORTCODE!
            const passKey = process.env.NEXT_SAFARICOM_PASSKEY!
            const timeStamp = moment(new Date()).format("YYYYMMDDHHmmss")
            const password = Buffer.from(shortCode + passKey + timeStamp).
                toString("base64");
            const data = {
                "BusinessShortCode": shortCode,
                "Password": password,
                "Timestamp": timeStamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": 1,
                "PartyA": req.body.phone,
                "PartyB": shortCode,
                "PhoneNumber": req.body.phone,
                "CallBackURL": "http://dukamoto.vercel.app/api/callback",
                "AccountReference": "Duka Moto",
                "TransactionDesc": "Payment for goods bought"
            }
            const stkRes = await fetch(stkUrl, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const stringStkRes = await stkRes.text()
            res.status(200).json(JSON.parse(stringStkRes))
        } else {
            res.status(403).json([{ error: 'Request not allowed' }]);
        }
    } catch (er) {
        console.log(er)
        res.status(500).json(er)
    }

}