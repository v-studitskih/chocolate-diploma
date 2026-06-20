import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  console.log(getCartCount());

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img
          src={assets.logo}
          width="144"
          height="44"
          className="h-auto w-36"
          alt="Шоколадная мастерская"
        />
      </Link>

      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <li>
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>ГЛАВНАЯ</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/customize" className="flex flex-col items-center gap-1">
            <p>КОНСТРУКТОР</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>О НАС</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>КОНТАКТЫ</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            width="20" 
            height="22"
            src={assets.profile_icon}
            className="w-5 h-auto cursor-pointer"
            alt="Профиль"
          />
          {token && (
            <div className="absolute right-0 hidden pt-4 group-hover:block dropdown-menu">
              <div className="flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100">
                <p className="cursor-pointer hover:text-black">Мой профиль</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Заказы
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Выйти
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            width="20" 
            height="22"
            className="w-5 h-auto min-w-5"
            alt="Корзина"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Меню"
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Назад</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            ГЛАВНАЯ
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/customize"
          >
            КОНСТРУКТОР
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            О НАС
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            КОНТАКТЫ
          </NavLink>
        </div>
      </div>
    </div>
  );
}
