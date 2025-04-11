import "./Menu.css";
import MenuItem from "../../components/MenuItem";
import { decodeJWT } from "../../utils/helpers";

function Menu() {
  const userRole = decodeJWT(localStorage.getItem("token")).payload.role;
  
  return (
    <div className="container">
      <input placeholder="Filter" type="text" />
      <div id="menu">
        <MenuItem
          imageLink="https://th.bing.com/th/id/OIP.RWaaZCnAJwE8O0FxwD7y0AHaEo?rs=1&pid=ImgDetMain"
          name="Miješana pizza"
          ingredients={["umak od pome", "šunka"]}
          price={12.99}
        />
        <MenuItem
          imageLink="https://th.bing.com/th/id/OIP.RWaaZCnAJwE8O0FxwD7y0AHaEo?rs=1&pid=ImgDetMain"
          name="Miješana pizza"
          ingredients={["umak od pome", "šunka"]}
          price={12.99}
        />
        <MenuItem
          imageLink="https://th.bing.com/th/id/OIP.RWaaZCnAJwE8O0FxwD7y0AHaEo?rs=1&pid=ImgDetMain"
          name="Miješana pizza"
          ingredients={["umak od pome", "šunka"]}
          price={12.99}
        />
        {userRole === "admin" ? (
          <div className="item">
            <h1>+</h1>  
            <h3>Dodaj artikl</h3>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Menu;
