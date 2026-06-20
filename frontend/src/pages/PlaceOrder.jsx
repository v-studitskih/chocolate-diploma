import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [deliveryType, setDeliveryType] = useState("delivery");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const itemCount = Object.keys(cartItems).length;
    if (itemCount === 0) {
      toast.error("Корзина пуста");
      return;
    }

    if (deliveryType === "pickup") {
      if (!formData.firstName || !formData.phone) {
        toast.error("Заполните имя и телефон для самовывоза");
        return;
      }
    } else {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.street ||
        !formData.city ||
        !formData.phone
      ) {
        toast.error("Заполните все поля доставки");
        return;
      }
    }

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        const item = cartItems[itemId];
        if (item && item.quantity > 0) {
          orderItems.push({
            productName: item.productName || "Кастомный шоколад",
            quantity: item.quantity,
            customization: item.customization || {},
            totalPrice: item.totalPrice,
            image: item.image || "",
          });
        }
      }

      let address;
      if (deliveryType === "pickup") {
        address = {
          firstName: formData.firstName,
          lastName: formData.lastName || "",
          phone: formData.phone,
          type: "pickup",
          address:
            "Самовывоз: г. Москва, ул. Тверская, д. 15 (с 10:00 до 20:00)",
        };
      } else {
        address = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state || "",
          zipcode: formData.zipcode || "",
          country: formData.country || "Россия",
          phone: formData.phone,
          type: "delivery",
        };
      }

      const totalAmount =
        getCartAmount() + (deliveryType === "delivery" ? delivery_fee : 0);

      let orderData = {
        address: address,
        items: orderItems,
        amount: totalAmount,
        paymentMethod: method === "cod" ? "COD" : method,
        deliveryType: deliveryType,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );
          if (response.data.success) {
            setCartItems({});
            toast.success(
              deliveryType === "pickup"
                ? "Заказ оформлен! Ожидайте в пункте самовывоза"
                : "Заказ оформлен! Ожидайте доставку",
            );
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          toast.error("Способ оплаты временно недоступен");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Ошибка оформления заказа");
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

  return (
    <main id="main-content" className="min-h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t"
      >
        <div className="flex flex-col w-full gap-4 sm:max-w-[480px]">
          <div className="my-3 text-xl sm:text-2xl ">
            <Title text1={"ОФОРМЛЕНИЕ"} text2={"ЗАКАЗА"} />
          </div>

          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setDeliveryType("delivery")}
              className={`flex-1 py-2 border rounded transition ${
                deliveryType === "delivery"
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              🚚 ДОСТАВКА
            </button>
            <button
              type="button"
              onClick={() => setDeliveryType("pickup")}
              className={`flex-1 py-2 border rounded transition ${
                deliveryType === "pickup"
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              📦 САМОВЫВОЗ
            </button>
          </div>

          {deliveryType === "pickup" && (
            <div className="p-3 mb-2 text-sm text-blue-700 rounded bg-blue-50">
              📍 Адрес самовывоза: г. Москва, ул. Тверская, д. 15
              <br />
              🕐 Режим работы: ежедневно с 10:00 до 20:00
              <br />
              📞 При себе необходимо иметь номер заказа
            </div>
          )}

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Имя *"
            />
            {deliveryType === "delivery" && (
              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Фамилия *"
              />
            )}
          </div>

          {deliveryType === "delivery" && (
            <>
              <input
                required
                onChange={onChangeHandler}
                name="email"
                value={formData.email}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="email"
                placeholder="Email *"
              />

              <input
                required
                onChange={onChangeHandler}
                name="street"
                value={formData.street}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Улица, дом, квартира *"
              />

              <div className="flex gap-3">
                <input
                  required
                  onChange={onChangeHandler}
                  name="city"
                  value={formData.city}
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="text"
                  placeholder="Город *"
                />
                <input
                  onChange={onChangeHandler}
                  name="state"
                  value={formData.state}
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="text"
                  placeholder="Область/Регион"
                />
              </div>

              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  name="zipcode"
                  value={formData.zipcode}
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="text"
                  placeholder="Индекс"
                />
                <input
                  onChange={onChangeHandler}
                  name="country"
                  value={formData.country}
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="text"
                  placeholder="Страна"
                />
              </div>
            </>
          )}

          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="tel"
            placeholder="Телефон *"
          />
        </div>

        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal deliveryType={deliveryType} />
          </div>

          <div className="mt-12">
            <Title text1={"СПОСОБ"} text2={"ОПЛАТЫ"} />

            <div className="flex flex-col gap-3 lg:flex-row">
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 p-2 px-3 border rounded cursor-pointer transition ${
                  method === "cod"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-500" : ""}`}
                ></p>
                <p className="mx-2 text-sm font-medium text-gray-700">
                  {deliveryType === "pickup"
                    ? "ОПЛАТА ПРИ ПОЛУЧЕНИИ"
                    : "НАЛИЧНЫМИ ПРИ ПОЛУЧЕНИИ"}
                </p>
              </div>

              <div
                onClick={() =>
                  toast.info(
                    "Демо-режим. Для теста используйте оплату при получении",
                  )
                }
                className="flex items-center gap-3 p-2 px-3 border rounded opacity-50 cursor-pointer"
              >
                <p className="min-w-3.5 h-3.5 border rounded-full"></p>
                <p className="mx-2 text-sm font-medium text-gray-500">
                  БАНКОВСКАЯ КАРТА (СКОРО)
                </p>
              </div>
            </div>

            <div className="w-full mt-8 text-end">
              <button
                type="submit"
                className="px-8 py-3 text-sm text-white transition bg-black rounded hover:bg-gray-800"
              >
                {deliveryType === "pickup"
                  ? "ЗАБРАТЬ САМОВЫВОЗОМ"
                  : "ОФОРМИТЬ ДОСТАВКУ"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
