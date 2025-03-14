async function checkFieldAppearance(conditions, User) {
  for (const key in conditions) {
    if (await User.findOne({ [key]: conditions[key] })) {
      throw Object.assign(new Error(), { status: 409 });
    }
  }
}

export { checkFieldAppearance };
