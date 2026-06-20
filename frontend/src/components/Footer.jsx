import React from "react";
import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer>
      <div className="flex sm:grid flex-col grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img
            width="128"
            height="39"
            className="w-32 mb-5"
            src={assets.logo}
            alt=""
          />
          <p className="w-full text-gray-600 md:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            dignissimos ipsa repellat similique dolorum eaque praesentium
            dolores quos quibusdam magnam.
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium"> О КОМПАНИИ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Главная</li>
            <li>О Нас</li>
            <li>Доставка</li>
            <li>Политика Конфиденциальности</li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">СВЯЗАТЬСЯ С НАМИ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@forever.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          2026@ chocolab.com - Все Права Защищены.
        </p>
      </div>
    </footer>
  );
}
