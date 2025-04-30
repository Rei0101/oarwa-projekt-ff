import CustomError from "../../shared/CustomErrorClass.js";
import { allowedCollections } from "../utils/allowedCollections.js";
import { handleCollection } from "../utils/handlers.js";

const welcomeMessage = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to the API for Meat Your Maker. Viewable collections: ${allowedCollections.join(
      ", "
    )}`,
  });
};

const getCollection = async (req, res, next) => {
  const collectionName = req.params.collection;

  try {
    const collection = await handleCollection(collectionName);

    if (collection.length == 0) {
      return next(new CustomError(404));
    }

    res.status(200).json(collection);
  } catch (error) {
    next(error);
  }
};

const addEntry = (Entry) => async (req, res, next) => {
  let name;

  if (req.baseUrl === "/api/categories" || req.baseUrl === "/api/ingredients") {
    name = req.body.name.toLowerCase();
  } else {
    name = req.body.name;
  }

  const newEntry = new Entry({ ...req.body, name });

  try {
    await newEntry.save();
    res.status(201).send(newEntry);
  } catch (error) {
    next(error);
  }
};

export { welcomeMessage, getCollection, addEntry };
