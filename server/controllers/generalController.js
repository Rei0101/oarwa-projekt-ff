import CustomError from "../../shared/CustomErrorClass.js";
import { allowedCollections } from "../utils/allowedCollections.js";
import { handleCollection } from "../utils/handlers.js";
import { checkFieldAppearance } from "../utils/helpers.js";

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
  const { name } = req.body.name;

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
