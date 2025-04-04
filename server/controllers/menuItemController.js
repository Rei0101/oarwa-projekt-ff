import { MenuItem } from "../models/menuItemModel.js";

//TODO Apply this function on item purchase
const updateMenuItemTimesSold = (menuItemId) => async (req, res, next) => {
  try {
    await MenuItem.findByIdAndUpdate(
      menuItemId,
      { $inc: { unitsSold: quantity } },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating units sold:", error);
  }
};

export { updateMenuItemTimesSold };
