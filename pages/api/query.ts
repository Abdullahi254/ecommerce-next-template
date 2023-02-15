import type { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment';

type Option = {
    method: string;
    headers: {
        "Content-Type": string;
        Authorization: string;
    };
    body: string;
}

async function fetchRetry(url: string, options: Option): Promise<any> {
    try {
        const res = await fetch(url, options)
        const textRes = await res.text()
        const errorCode:undefined|string = JSON.parse(textRes).errorCode
        if(errorCode==="500.001.1001"){
            console.log("Retrying fetch")
            return fetchRetry(url,options)
        }
        return JSON.parse(textRes)
    } catch (er:any) {
        console.log("Error sending safricom query request")
        throw new Error(er)
    }

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'POST') {
        try {
            const { id } = req.query
            const tokenUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
            const queryUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
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
            const password = Buffer.from(shortCode + passKey + timeStamp).toString("base64")
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    "BusinessShortCode": shortCode,
                    "Password": password,
                    "Timestamp": timeStamp,
                    "CheckoutRequestID": req.body.checkoutRequestID,
                })
            }
            const response = await fetchRetry(queryUrl, options)
            const data = {
                paymentSessionId: id,
                transactionId: response.CheckoutRequestID,
                state: response.ResultCode === 0 ? "processed" : "failed",
                error: {
                  code: "transaction_failed",
                  message: response.ResultDesc
                }
              }
              const snipRes = await fetch("https://payment.snipcart.com/api/private/custom-payment-gateway/payment", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${process.env.NEXT_PRIMARY_SECRET_API_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
              })
              if (snipRes.ok) {
                const body = await response.json()
                res.redirect(body.returnUrl)
                res.status(200).json({
                    message:"successfully created payment"
                })
              }else{
                throw new Error("Error making snipcart payment")
              }
              
        } catch (er) {
            res.status(500).json({ error: er })
        }
    } else {
        res.status(400).json([{ error: 'Request sent Incorrectly' }]);
    }
}
