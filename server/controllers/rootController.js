export const rootMessage = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Add /api to the URL to access the Meat Your Maker API.",
  });
};
