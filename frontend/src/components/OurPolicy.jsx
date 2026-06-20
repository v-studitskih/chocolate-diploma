import React from "react";
import { assets } from "../assets/assets";

export default function OurPolicy() {
  return (
    <div className="flex flex-col justify-around gap-12 py-20 text-xs text-center text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
      <div>
        <img
          src={assets.exchange_icon}
          className="w-12 h-auto m-auto mb-5"
          width="48"
          height="48"
          alt="Гарантия свежести"
        />
        <p className="font-serif">Гарантия Свежести</p>
        <p className="text-gray-600">Вернём деньги, если продукт испорчен</p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          className="w-12 h-auto m-auto mb-5"
          width="48"
          height="48"
          alt="НЕ как у всех"
        />
        <p className="font-serif">Не Как У Всех</p>
        <p className="text-gray-600">
          Даже два одинаковых заказа мы упакуем по-разному, если попросите
        </p>
      </div>

      <div>
        <img
          src={assets.support_img}
          className="w-12 h-auto m-auto mb-5"
          width="48"
          height="48"
          alt="Лучшая поддержка"
        />
        <p className="font-serif">Лучшая Поддержка</p>
        <p className="text-gray-600">Мы обеспечиваем поддержку клиентов 24/7</p>
      </div>
    </div>
  );
}
