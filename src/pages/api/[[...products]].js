import { retrieveData, retrieveDataById } from "@/lib/firebase/services";

export default async function handler(req, res) {
    console.log(req.query);

    console.log(req.query.products[1]);

    if (req.query.products[1]) {
      const data = await retrieveDataById("products", req.query.products[1])
      res.status(200).json({status: true, statusCode: 200, data})
    } else {
      const data = await retrieveData("products")
      res.status(200).json({status: true, statusCode: 200, data})
    }
  }
  