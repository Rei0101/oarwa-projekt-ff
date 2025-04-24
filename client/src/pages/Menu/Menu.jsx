import "./Menu.css";
import MenuItem from "../../components/MenuItem";
import useMenuItems from "../../hooks/useMenuItems";
import { decodeJWT } from "../../utils/helpers";
import { useState } from "react";

function Menu() {
  let userRole = null;

  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      userRole = decoded.payload.role;
    }
  } catch (error) {
    console.error("Token error:", error.message);
  }

  const [filter, setFilter] = useState("");
  const [clickedAdd, setClickedAdd] = useState(false);
  const {collectionData, error} = useMenuItems(filter);
  
  return (
    <div className="container">
      <input
        placeholder="Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        type="text"
      />
      {!error ? (
        <div id="menu">
          {
            collectionData.map((item) => {
              return <MenuItem
                key={item._id}
                imageLink={item.imageLink || null}
                name={item.name}
                category={item.categories.sort((a, b) => b.type.localeCompare(a.type))[0]?.name}
                ingredients={[...item.ingredients]}
                price={item.price}
                userRole={userRole}
              />
            })
          }
          
          {userRole === "admin" ? (
            <div
              className="item add"
              onClick={() => setClickedAdd((prev) => !prev)}
            >
              {!clickedAdd ? (
                <span>
                  <h1>+</h1>
                  <h2>Dodaj artikl</h2>
                </span>
              ) : (
                <span>
                  <form></form>
                </span>
              )}
            </div>
          ) : null}
        </div>
      ) : (<h3>{error}</h3>)}
    </div>
  );
}

export default Menu;
