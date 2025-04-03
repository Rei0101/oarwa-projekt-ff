import { MenuItem } from "../models/menuItemModel.js";
import { checkFieldAppearance } from "../utils/helpers.js";

const addMenuItem = async (req, res, next) => {
  
    const {name} = req.body.name;
    console.log(req.body);
    
    const newMenuItem = new MenuItem({ ...req.body });
  
    try {
        await checkFieldAppearance({ name }, MenuItem);
        await newMenuItem.save();
        res.status(201).send(newMenuItem);
    } catch (error) {
      next(error);
    }
};

//TODO Apply this function on item purchase
/* const updateMenuItemTimesSold = async (req, res, next) => {
  try {
    await MenuItem.findByIdAndUpdate(
      menuItemId,
      { $inc: { unitsSold: quantity } }, // Increment unitsSold by the quantity sold
      { new: true } // Return the updated document
    );
  } catch (error) {
    console.error("Error updating units sold:", error);
  }
    
}; */

export { addMenuItem };
