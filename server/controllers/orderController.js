const placeOrder = async (req, res, next) => {
  const { userId, bagItems, totalPrice } = req.body;

  res.status(200).json("Order placed successfully.");
};

export { placeOrder };
