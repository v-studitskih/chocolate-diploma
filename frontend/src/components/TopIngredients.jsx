import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function TopIngredients() {
  const { products } = useContext(ShopContext);
  const [topIngredients, setTopIngredients] = useState([]);

  useEffect(() => {
    const popularOptions = products.filter((item) => item.popularity === true);
    setTopIngredients(popularOptions.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"ТОП"} text2={"ИНГРЕДИЕНТОВ"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Самые популярные ингредиенты среди наших клиентов
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
        {topIngredients.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
