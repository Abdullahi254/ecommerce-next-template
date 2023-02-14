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
        if (res.ok) {
            return res.json()
        }
        console.log(res.status)
        return fetchRetry(url, options)
    } catch (er) {
        throw new Error("imedinda")
    }

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'POST') {
        try {
            const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
            const shortCode = process.env.NEXT_SAFARICOM_SHORTCODE!
            const passKey = process.env.NEXT_SAFARICOM_PASSKEY!
            const timeStamp = moment(new Date()).format("YYYYMMDDHHmmss")
            const password = Buffer.from(shortCode + passKey + timeStamp).toString("base64")
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer cmmpPLSRphlnmcGNkI1DxlBfsgAR"
                },
                body: JSON.stringify({
                    "BusinessShortCode": shortCode,
                    "Password": password,
                    "Timestamp": timeStamp,
                    "CheckoutRequestID": req.body.checkoutRequestID,
                })
            }
            const response = await fetchRetry(url, options)
            res.status(200).json(response)
        } catch (er) {
            res.status(500).json({error:er})
        }
    } else {
        res.status(400).json([{ error: 'Request sent Incorrectly' }]);
    }
}
