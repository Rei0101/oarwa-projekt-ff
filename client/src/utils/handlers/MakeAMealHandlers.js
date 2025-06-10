import { includeValidAttributes } from "../helpers";

function handleMealCreation(
  e,
  formIngredients,
  totalPrice,
  bagItems,
  addToBag,
  removeFromBag,
  userRole,
  navigate
) {
  e.preventDefault();
  
  if (userRole === undefined) {
    navigate("/login");
    return;
  }
  if (userRole === "admin") {
    alert("Administratorski računi nemaju ove ovlasti.");
    return;
  }
  
  const finalIngredients = includeValidAttributes(formIngredients);
  
  if (finalIngredients.length === 0) {
    alert("Nema označenih sastojaka.");
    return;
  }

  if (bagItems.find((i) => i.type === "custom")) {
    removeFromBag("custom");
  } else {
    addToBag({
      name: "Kreirano jelo",
      ingredients: finalIngredients,
      price: totalPrice,
      type: "custom",
    });
  }
}

export { handleMealCreation };
