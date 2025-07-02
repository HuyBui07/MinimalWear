import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useLocation } from "react-router-dom";

// Icons
import DashboardIcon from "../../assets/dashboard.svg?react";
import OrderIcon from "../../assets/order.svg?react";
import ProductIcon from "../../assets/product.svg?react";
import Logo from "../../assets/men.png";

function MenuItemComponent({ icon, link }: { icon: any; link: string }) {
  const location = useLocation();

  return (
    <MenuItem
      style={{ margin: "20px" }}
      icon={icon}
      active={location.pathname.startsWith(link)}
      component={<NavLink to={link} />}
    >
      {link === "/purchase-orders"
        ? "Purchase Orders"
        : link.charAt(1).toUpperCase() + link.slice(2)}
    </MenuItem>
  );
}

export default function SideBar() {
  return (
    <div className="sticky top-0  bg-white border-r border-gray-200 h-screen w-fit">
      <div className="flex justify-center items-center h-16 my-5">
        <img src={Logo} alt="Logo" className="h-12" />
      </div>
      <Sidebar
        width="300px"
        backgroundColor="#FFFFFF"
        rootStyles={{
          border: "none",
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0) {
                return {
                  color: disabled ? "#eee" : active ? "white" : "black",
                  backgroundColor: active ? "black" : undefined,
                  borderRadius: active ? "18px" : undefined,
                  fontWeight: active ? "600" : "500",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "#f7e8ef",
                    fill: "white",
                    borderRadius: "18px",
                    fontWeight: "600",
                  },
                };
              }
            },
          }}
        >
          <MenuItemComponent icon={<DashboardIcon />} link="/dashboard" />
          <MenuItemComponent icon={<OrderIcon />} link="/order" />
          <MenuItemComponent icon={<ProductIcon />} link="/product" />
        </Menu>
      </Sidebar>
    </div>
  );
}
