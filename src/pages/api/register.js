import { signUp } from "@/lib/firebase/services";

export default async function handler(req, res) {
    console.log(req.body);
    if (req.method === "POST") {
        await signUp(req.body, ({status, message}) => {
            if(status) {
                res.status(201).json({status, message})
            } else {
                res.status(400).json({status, message})
            }
        } )
    } else {
        res.status(405).json({status: false, message: "Method Not Allowed"})
    }
  }