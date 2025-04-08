import CustomError from "../../shared/CustomErrorClass.js";

const checkFieldAppearance = async (conditions, Field) => {
  for (const field in conditions) {
    if (await Field.findOne({ [field]: conditions[field] })) {
      return new CustomError(409);
    }
  }
};

export { checkFieldAppearance };
