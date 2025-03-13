import { getCollectionData } from "../utils/collectionHandler.js";

const welcomeMessage = (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API for Meat Your Maker.",
  });
};

const getCollection = async (req, res, next) => {
  const collectionName= req.params.collection;
  let collection;
  try {
    collection = await getCollectionData(collectionName);
    
    if (collection.length == 0) {
      const error = new Error()
      error.status = 404;
      throw error;
    }

    res.json(collection);
  } catch (error) {
    
    next(error)
  }
};

export { welcomeMessage, getCollection };
