import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

export default function Combinations() {
  const { popularCombinations, backendUrl } = useContext(ShopContext);
  const [latestCombinations, setLatestCombinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLatestCombinations(popularCombinations.slice(0, 5));
  }, [popularCombinations]);

  if (latestCombinations.length === 0) {
    return null;
  }

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"ПОПУЛЯРНЫЕ"} text2={"КОМБИНАЦИИ"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Готовые идеи для вдохновения — выбери и добавь в корзину
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
        {latestCombinations.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer group"
            onClick={() => applyCombination(item._id)}
          >
            <div className="overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={`${backendUrl}${item.image}`}
                alt={item.name}
                width={"240px"}
                height={"240px"}
                className="object-cover w-full transition group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "/placeholder-combo.jpg";
                }}
              />
            </div>
            <div className="mt-2 text-center">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm ">{item.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
