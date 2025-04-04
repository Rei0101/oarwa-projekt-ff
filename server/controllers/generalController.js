import CustomError from "../../shared/CustomErrorClass.js"
import { allowedCollections } from "../utils/allowedCollections.js";
import { getCollectionData } from "../utils/collectionHandler.js";
import { checkFieldAppearance } from "../utils/helpers.js";

const welcomeMessage = (req, res) => {
  res.status(200).json({
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
      throw new CustomError(404);
    }

    res.status(200).json(collection);
  } catch (error) {
    next(error);
  }
};

const addEntry = (Entry) => async (req, res, next) => {
  
  const {name} = req.body.name;
  
  const newEntry = new Entry({ ...req.body });

  try {
      await checkFieldAppearance({ name }, Entry);
      await newEntry.save();
      res.status(201).send(newEntry);
  } catch (error) {
    next(error);
  }
};

export { welcomeMessage, getCollection, addEntry };
