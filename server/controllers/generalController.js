import { allowedCollections } from "../utils/allowedCollections.js";
import { getCollectionData } from "../utils/collectionHandler.js";

const welcomeMessage = (req, res) => {
  res.json({
    success: true,
    message: `Welcome to the API for Meat Your Maker. Viewable collections: ${allowedCollections}`,
  });
};

const getCollection = async (req, res, next) => {
  const collectionName = req.params.collection;
  let collection;

  try {
    collection = await getCollectionData(collectionName);

    if (collection.length == 0) {
      throw Object.assign(new Error(), { status: 404 });
    }

    res.json(collection);
  } catch (error) {
    next(error);
  }
};

export { welcomeMessage, getCollection };
