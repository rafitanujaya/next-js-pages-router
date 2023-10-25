export default async function handler(req, res) {
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    res
      .status(401)
      .json({ revalidated: false, message: "Insert correct token!!" });
  }
  if (req.query.data === "product") {
    try {
      await res.revalidate("/product/static");
      return res.json({ revalidated: true });
    } catch (error) {
      return res.status(500).send({ revalidated: false });
    }
  }
  return res.json({
    revalidated: false,
    message: "Select your data first",
  });
}
