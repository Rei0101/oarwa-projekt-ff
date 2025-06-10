import { useState, useEffect } from "react";
import BagContext from "./BagContext";

function BagProvider({ children }) {
  const [bagItems, setBagItems] = useState(() => {
    const stored = localStorage.getItem("bagItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
  }, [bagItems]);

  const addToBag = (item) => {
    setBagItems((prev) => {
      const existingId = prev.find((i) => i.id === item.id);

      if (existingId) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromBag = (id) => {
    if (id === "custom") {
      setBagItems((prev) => prev.filter((i) => i.type !== "custom"));
      return;
    }

    setBagItems((prev) => {
      let changed = prev.map((i) =>
        id === i.id ? { ...i, quantity: i.quantity - 1 } : i
      );
      changed = changed.filter((i) => i.quantity > 0);
      return changed;
    });
  };

  const clearBag = () => setBagItems([]);

  return (
    <BagContext.Provider
      value={{ bagItems, addToBag, removeFromBag, clearBag }}
    >
      {children}
    </BagContext.Provider>
  );
}

export default BagProvider;
