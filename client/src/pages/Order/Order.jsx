import "./Order.css";
import useBagContext from "../../hooks/useBagContext";
import { formatFromKebabCase } from "../../utils/helpers";

function Order() {
  const { bagItems, clearBag } = useBagContext();
  console.log(bagItems);

  return (
    <div className="container order">
      {bagItems.length > 0 ? (
        <>
          <div>
            <ul>
              {bagItems.map((item) => (
                <li key={item.id || "custom"}>
                  {item.id ? (
                    <span>
                      <img
                        src={item.imageLink}
                        alt={item.imageLink + " slika"}
                      />
                      <p>
                        <h4>{item.name}</h4>
                        <br />
                        Količina: {item.quantity}
                        <br />
                        Cijena: {item.price * item.quantity} €
                      </p>
                    </span>
                  ) : (
                    <span className="custom">
                      <p>
                        <h4>{item.name}</h4>
                        <br />
                        Cijena: {item.price * item.quantity} €
                        <br />
                        <span className="ingredients">
                          <span>Sastojci:</span>
                          <span><ul>{item.ingredients.map((ingredient) => (
                            <li>
                              {formatFromKebabCase(ingredient)}
                            </li>)
                          )}</ul></span>
                        </span>
                      </p>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button>Naruči!</button>
          </div>
        </>
      ) : (
        <h3>Nemate ništa u košarici!</h3>
      )}
    </div>
  );
}

export default Order;
