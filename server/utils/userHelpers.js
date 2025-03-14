const checkFieldAppearance = async (conditions, User) => {
  for (const field in conditions) {
    if (await User.findOne({ [field]: conditions[field] })) {
      throw Object.assign(new Error(), { status: 409 });
    }
  }
}

export { checkFieldAppearance };
