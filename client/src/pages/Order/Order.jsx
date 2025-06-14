import "./Order.css";
import { placeOrder } from "../../utils/handlers/orderHandlers";
import {
  fetchImageByCategory,
  descSortAttribute,
  formatFromKebabCase,
  sortByObjectAttribute,
} from "../../utils/helpers";
import useAuthContext from "../../hooks/useAuthContext";
import useBagContext from "../../hooks/useBagContext";
import { useNavigate } from "react-router-dom";

function Order() {
  const { user } = useAuthContext();
  const { bagItems, clearBag } = useBagContext();

  const sortedBag = bagItems ? sortByObjectAttribute(bagItems) : [];

  const totalPrice = sortedBag.reduce(
    (accumulator, value) => accumulator + value.price * value.quantity,
    0
  );

  const navigate = useNavigate();

  return (
    <div className="container order">
      {user?.role ? (
        sortedBag.length > 0 ? (
          <>
            <div>
              <ul>
                {sortedBag.map((item) => (
                  <li key={item.id || "custom"}>
                    {item.id ? (
                      <div className="menu">
                        <img
                          src={fetchImageByCategory(
                            item.imageLink,
                            descSortAttribute(item.categories, "name")
                          )}
                          alt={item.imageLink + " slika"}
                        />
                        <div className="text">
                          <h4>{item.name}</h4>
                          <div className="info">
                            Količina: {item.quantity}
                            <br />
                            Cijena: {item.price * item.quantity} €
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="custom">
                        <div className="text">
                          <h4>{item.name}</h4>
                          <div className="info">
                            Cijena: {item.price * item.quantity} €
                            <br />
                            <div id="ingredients">
                              <div>Sastojci:</div>
                              <div>
                                <ul>
                                  {item.ingredients.map((ingredient) => (
                                    <li key={ingredient}>
                                      {formatFromKebabCase(ingredient)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Sveukupna cijena: {totalPrice.toFixed(2)} €</h3>
              <button
                onClick={() =>
                  placeOrder(
                    user?.id,
                    sortedBag,
                    totalPrice,
                    clearBag,
                    navigate
                  )
                }
              >
                Naruči!
              </button>
              <button onClick={() => clearBag()}>Isprazni vrećicu</button>
            </div>
          </>
        ) : (
          <h3>Nemate ništa u vrećici!</h3>
        )
      ) : (
        <div className="login-message">
          <h3>Prijavite se kako biste naručivali jela.</h3>
          <button onClick={() => navigate("/login")}>Prijava</button>
        </div>
      )}
    </div>
  );
}

export default Order;
