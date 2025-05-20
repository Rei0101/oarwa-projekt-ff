import CustomError from "../../../../shared/CustomErrorClass";
import handleError from "./errorHandler";
import entryService from "../../services/entryService";

async function fetchDocument(collectionName, id, setError) {
  try {
    const response = await entryService.fetchOne(collectionName, id);
    if (setError) {
      setError(null);
    }
    return response;
  } catch (error) {
    error = new CustomError(500);
    if (setError) {
      handleError(error, setError);
    } else {
      throw console.error(
        new CustomError(error?.status || error?.response?.status || 500)
      );
    }
  }
}

async function fetchCollection(collectionName, setError) {
  try {
    const response = await entryService.fetchAll(collectionName);
    if (setError) {
      setError(null);
    }
    return response;
  } catch (error) {
    error = new CustomError(500);
    if (setError) {
      handleError(error, setError);
    } else {
      throw console.error(
        new CustomError(error?.status || error?.response?.status || 500)
      );
    }
  }
}

async function deleteEntry(collectionName, id, collectionData, setCollectionData) {
  try {
    const response = await entryService.delete(collectionName, id);
    setCollectionData(collectionData.filter((data) => data._id !== id));
    return response;
  } catch (error) {
    throw console.error(
      new CustomError(error?.status || error?.response?.status || 500)
    );
  }
}


export {
  fetchDocument,
  fetchCollection,
  deleteEntry,
};
