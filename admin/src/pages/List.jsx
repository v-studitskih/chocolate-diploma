import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

export default function List({ token }) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + "/api/product/" + id, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCategoryName = (category) => {
    const categories = {
      form: "Форма",
      base: "Основа",
      filling: "Начинка",
      decor: "Декор",
      packaging: "Упаковка",
    };
    return categories[category] || category;
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-lg font-medium">Список опций</p>

      {/* Десктопная таблица (visible on md and up) */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-medium">
          <b>Изобр.</b>
          <b>Название</b>
          <b>Категория</b>
          <b>Цена</b>
          <b>Доступно</b>
          <b className="text-center">Действие</b>
        </div>

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm"
            key={index}
          >
            <img
              className="object-cover w-10 h-10 rounded"
              src={`http://localhost:4000${item.image[0]}`}
              alt=""
              onError={(e) => {
                e.target.src = "/placeholder.png";
              }}
            />
            <p className="truncate">{item.name}</p>
            <p>{getCategoryName(item.category)}</p>
            <p>{item.price === 0 ? "Бесплатно" : `${currency}${item.price}`}</p>
            <p className="text-center">{item.isAvailable ? "✅" : "❌"}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-xl text-center transition cursor-pointer hover:text-red-500"
            >
              ✖
            </p>
          </div>
        ))}
      </div>

      {/* Мобильные карточки (visible on mobile) */}
      <div className="space-y-3 md:hidden">
        {list.map((item, index) => (
          <div key={index} className="p-3 bg-white border rounded-lg shadow-sm">
            <div className="flex gap-3">
              <img
                className="object-cover w-16 h-16 rounded"
                src={`http://localhost:4000${item.image[0]}`}
                alt=""
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {getCategoryName(item.category)}
                </p>
                <p className="text-sm font-medium">
                  {item.price === 0 ? "Бесплатно" : `${currency}${item.price}`}
                </p>
                <p className="text-sm">
                  {item.isAvailable ? "✅ Доступно" : "❌ Недоступно"}
                </p>
              </div>
              <button
                onClick={() => removeProduct(item._id)}
                className="px-2 text-xl text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
