const welcomeMessage = (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API for Meat Your Maker.",
  });
};

export { welcomeMessage };
