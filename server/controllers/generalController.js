import CustomError from "../../shared/CustomErrorClass.js";
import { allowedCollections } from "../utils/allowedCollections.js";
import { fetchDocuments } from "../utils/helpers.js";

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
    const collection = await fetchDocuments(collectionName);

    if (collection.length == 0) {
      return next(new CustomError(404));
    }

    res.status(200).json(collection);
  } catch (error) {
    next(error);
  }
};

const addEntry = (Entry) => async (req, res, next) => {
  const name = req.name ?? req.body?.name;

  const newEntry = new Entry({ ...req.body, name });

  try {
    await newEntry.save();
    res.status(201).send(newEntry);
  } catch (error) {
    next(error);
  }
};

const partiallyUpdateEntry = (Entry) => async (req, res, next) => {
  const name = req.name ?? req.body?.name;
  const updatedData = { ...req.body, name };

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEntry) {
      return next(new CustomError(404));
    }

    res.status(200).send(updatedEntry);
  } catch (error) {
    next(error);
  }
};
const fullyUpdateEntry = (Entry) => async (req, res, next) => {
  const name = req.name ?? req.body?.name;
  const updatedData = { ...req.body, name };

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        overwrite: true,
        runValidators: true,
      }
    );

    if (!updatedEntry) {
      return next(new CustomError(404));
    }

    res.status(200).send(updatedEntry);
  } catch (error) {
    next(error);
  }
};

const deleteEntry = (Entry) => async (req, res, next) => {
  try {
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      return next(new CustomError(404));
    }

    res.json({
      success: true,
      message: "Successfully deleted entry",
      deletedEntry,
    });
  } catch (error) {
    next(error);
  }
};

export {
  welcomeMessage,
  getCollection,
  addEntry,
  fullyUpdateEntry,
  partiallyUpdateEntry,
  deleteEntry,
};
