import { useState } from "react";

function BagProvider({ children }) {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (item) => {
    setBagItems(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromBag = (id) => {
    setBagItems(prev => prev.filter(item => item._id !== id));
  };

  const clearBag = () => setBagItems([]);

  return (
    <BagContext.Provider value={{ bagItems, addToBag, removeFromBag, clearBag }}>
      {children}
    </BagContext.Provider>
  );
};

export default BagProvider;