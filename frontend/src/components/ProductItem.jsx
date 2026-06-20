import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

export default function ProductItem({ id, image, name, price }) {
  const { currency, backendUrl } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="object-cover w-full h-auto transition hover:scale-110"
          width="300"
          height="300"
          src={`${backendUrl}${image[0]}`}
          alt={name}
          loading="lazy"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
}
