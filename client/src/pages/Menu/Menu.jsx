import "./Menu.css";
import MenuItem from "../../components/MenuItem";

function Menu() {
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
      </div>
    </div>
  );
}

export default Menu;
