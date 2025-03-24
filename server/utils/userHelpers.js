import CustomError from "../../shared/CustomErrorClass.js"

const checkFieldAppearance = async (conditions, User) => {
  for (const field in conditions) {
    if (await User.findOne({ [field]: conditions[field] })) {
      throw new CustomError(409);
    }
  }
}

export { checkFieldAppearance };
