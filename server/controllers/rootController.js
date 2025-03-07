export const rootMessage = (req, res) => {
  res.json({
    success: true,
    message: "Add /api to the URL to access the Meat Your Maker API.",
  });
};
