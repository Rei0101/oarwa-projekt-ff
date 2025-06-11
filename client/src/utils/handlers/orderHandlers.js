import CustomError from "../../../../shared/CustomErrorClass";
import orderService from "../../services/orderService";

async function placeOrder(userId, bagItems, totalPrice, clearBag, navigate) {
  try {
    const result = orderService.order(userId, bagItems, totalPrice);
    alert("Hvala na narudžbi.");
    clearBag();
    navigate("/");
    return result;
  } catch (error) {
    alert("Dogodila se greška pri naručivanju!");
    return console.error(
      new CustomError(error?.status || error?.response?.status || 500)
    );
  }
}

export { placeOrder };
