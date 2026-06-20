import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function RelatedProducts({ category, currentProductId }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0 && category) {
      let productsCopy = products.filter(
        (item) =>
          item.category === category &&
          item._id !== currentProductId &&
          item.isAvailable === true,
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, currentProductId]);

  if (related.length === 0) return null;

  return (
    <div className="my-24">
      <div className="py-2 text-3xl text-center">
        <Title text1={"ПОХОЖИЕ"} text2={"ОПЦИИ"} />
      </div>
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
