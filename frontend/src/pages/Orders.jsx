import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.get(backendUrl + "/api/order/userorders", {
        headers: { token },
      });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
              deliveryType: order.address?.type || "delivery",
              pickupAddress:
                order.address?.type === "pickup"
                  ? order.address?.address
                  : null,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCompositionText = (customization) => {
    if (!customization) return "";
    const parts = [];
    if (customization.form?.name) parts.push(customization.form.name);
    if (customization.base?.name) parts.push(customization.base.name);
    if (customization.filling?.length) {
      parts.push(`нач: ${customization.filling.map((f) => f.name).join(", ")}`);
    }
    if (customization.decor?.length) {
      parts.push(`дек: ${customization.decor.map((d) => d.name).join(", ")}`);
    }
    if (customization.packaging?.name) parts.push(customization.packaging.name);
    return parts.join(" • ");
  };

  const getAddressText = (item) => {
    if (item.deliveryType === "pickup") {
      return item.pickupAddress || "Самовывоз (г. Москва, ул. Тверская, д. 15)";
    }
    return "Доставка по адресу";
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title text1={"МОИ"} text2={"ЗАКАЗЫ"} />
      </div>

      <div>
        {orderData.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            У вас пока нет заказов
          </div>
        ) : (
          orderData.slice(0, 20).map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-6 text-sm">
                <div>
                  <p className="font-medium sm:text-base">
                    {item.productName || "Кастомный шоколад"}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.totalPrice || item.price}
                    </p>
                    <p>Кол-во: {item.quantity}</p>
                  </div>
                  <p
                    className="mt-1 text-xs text-gray-400 max-w-[250px]"
                    title={getCompositionText(item.customization)}
                  >
                    {getCompositionText(item.customization)}
                  </p>
                  <p className="mt-1">
                    Дата:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Оплата:{" "}
                    <span className="text-gray-400">
                      {item.paymentMethod === "COD"
                        ? "Наличными при получении"
                        : item.paymentMethod}
                    </span>
                  </p>

                  <p className="mt-1">
                    {item.deliveryType === "pickup" ? (
                      <span className="text-blue-600">📦 Самовывоз</span>
                    ) : (
                      <span className="text-green-600">🚚 Доставка</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <p
                    className={`h-2 rounded-full min-w-2 ${
                      item.status === "Delivered"
                        ? "bg-green-500"
                        : item.status === "Shipped"
                          ? "bg-blue-500"
                          : item.status === "Order Placed"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                    }`}
                  ></p>
                  <p className="text-sm md:text-base">
                    {item.status === "Order Placed"
                      ? "Заказ оформлен"
                      : item.status === "Packing"
                        ? "Упаковка"
                        : item.status === "Shipped"
                          ? "Отправлен"
                          : item.status === "Out For Delivery"
                            ? "Доставляется"
                            : item.status === "Delivered"
                              ? item.deliveryType === "pickup"
                                ? "Готов к выдаче"
                                : "Доставлен"
                              : item.status}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (item.deliveryType === "pickup") {
                      toast.info(`Самовывоз: ${getAddressText(item)}`);
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium border rounded-sm hover:bg-gray-50"
                >
                  {item.deliveryType === "pickup" ? "Где забрать" : "Отследить"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
