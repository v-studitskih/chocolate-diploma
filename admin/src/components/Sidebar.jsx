import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Sidebar() {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 px-3 py-2 border border-r-0 border-gray-300 rounded-l"
          to="/add"
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden md:block">Добавить Опцию</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 border border-r-0 border-gray-300 rounded-l"
          to="/add-combination"
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden md:block">Добавить Комбинацию</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 border border-r-0 border-gray-300 rounded-l"
          to="/list"
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden md:block">Список Опций</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 border border-r-0 border-gray-300 rounded-l"
          to="/orders"
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden md:block">Заказы</p>
        </NavLink>
      </div>
    </div>
  );
}
