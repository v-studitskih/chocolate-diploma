import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.get(
        backendUrl + "/api/order/list",
        { headers: { token } },
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.patch(
        backendUrl + "/api/order/" + orderId + "/status",
        { status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Статус обновлён");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Получение понятного описания состава шоколада
  const getCustomizationText = (customization) => {
    if (!customization) return "";

    let result = [];

    if (customization.form?.name) {
      result.push(`Форма: ${customization.form.name}`);
    }

    if (customization.base?.name) {
      result.push(`Основа: ${customization.base.name}`);
    }

    if (customization.filling && customization.filling.length > 0) {
      const fillingNames = customization.filling.map((f) => f.name).join(", ");
      result.push(`Начинка: ${fillingNames}`);
    }

    if (customization.decor && customization.decor.length > 0) {
      const decorNames = customization.decor.map((d) => d.name).join(", ");
      result.push(`Декор: ${decorNames}`);
    }

    if (customization.packaging?.name) {
      result.push(`Упаковка: ${customization.packaging.name}`);
    }

    return result.join(" · ");
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">Заказы</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />

            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className="py-0.5" key={idx}>
                    {item.productName || "Кастомный шоколад"} x {item.quantity}
                    <span className="block text-xs text-gray-400">
                      {getCustomizationText(item.customization)}
                    </span>
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">
                Товаров: {order.items.length}
              </p>
              <p className="mt-3">Оплата: {order.paymentMethod}</p>
              <p>Статус: {order.payment ? "Оплачено" : "Ожидает оплаты"}</p>
              <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px] font-medium">
              {currency} {order.amount}
            </p>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold bg-white border rounded"
            >
              <option value="Order Placed">Заказ оформлен</option>
              <option value="Packing">Упаковка</option>
              <option value="Shipped">Отправлен</option>
              <option value="Out For Delivery">Доставляется</option>
              <option value="Delivered">Доставлен</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
