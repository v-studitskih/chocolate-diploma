import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

export default function Cart() {
  const { cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] && cartItems[itemId].quantity > 0) {
        tempData.push({
          itemId: itemId,
          ...cartItems[itemId]
        });
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Формирование текста состава шоколада
  const getCompositionText = (customization) => {
    if (!customization) return "";
    const parts = [];
    if (customization.form?.name) parts.push(customization.form.name);
    if (customization.base?.name) parts.push(customization.base.name);
    if (customization.filling?.length) {
      parts.push(`начинка: ${customization.filling.map(f => f.name).join(", ")}`);
    }
    if (customization.decor?.length) {
      parts.push(`декор: ${customization.decor.map(d => d.name).join(", ")}`);
    }
    if (customization.packaging?.name) parts.push(customization.packaging.name);
    return parts.join(" • ");
  };

  // Подсчёт общей суммы корзины
  const getCartTotal = () => {
    let total = 0;
    cartData.forEach(item => {
      total += item.totalPrice * item.quantity;
    });
    return total;
  };

  // Обработчик изменения количества
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === "" || newQuantity === "0") {
      updateQuantity(itemId, 0);
      toast.info("Товар удалён из корзины");
    } else {
      updateQuantity(itemId, Number(newQuantity));
    }
  };

  // Обработчик удаления товара
  const handleRemoveItem = (itemId, itemName) => {
    updateQuantity(itemId, 0);
    toast.info(`${itemName} удалён из корзины`);
  };

  if (cartData.length === 0) {
    return (
      <div className="border-t pt-14">
        <div className="mb-3 text-2xl">
          <Title text1={"ВАША"} text2={"КОРЗИНА"} />
        </div>
        <div className="py-20 text-center">
          <p className="text-gray-500">Корзина пуста</p>
          <button 
            onClick={() => navigate("/")}
            className="px-6 py-2 mt-4 text-white transition bg-black rounded hover:bg-gray-800"
          >
            СОБРАТЬ ШОКОЛАД
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={"ВАША"} text2={"КОРЗИНА"} />
      </div>
      
      <div>
        {cartData.map((item, index) => (
          <div
            key={index}
            className="grid py-4 text-gray-700 border-t border-b grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
            <div className="flex items-start gap-6">
              <img
                className="object-cover w-16 h-16 rounded sm:w-20 sm:h-20"
                src={item.image || assets.hero_img}
                alt="Кастомный шоколад"
                onError={(e) => { e.target.src = assets.hero_img }}
              />
              <div>
                <p className="text-xs font-medium sm:text-lg">
                  {item.productName || "Кастомный шоколад"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {currency}{item.totalPrice} за шт.
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-[200px] sm:max-w-xs" title={getCompositionText(item.customization)}>
                  {getCompositionText(item.customization)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}
                className="w-6 h-6 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}
                className="w-6 h-6 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
            
            <img
              onClick={() => handleRemoveItem(item.itemId, item.productName)}
              className="w-4 mr-4 cursor-pointer sm:w-5 hover:opacity-70"
              src={assets.bin_icon}
              alt="Удалить"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="px-8 py-3 my-8 text-sm text-white transition bg-black rounded hover:bg-gray-800"
            >
              ПЕРЕЙТИ К ОФОРМЛЕНИЮ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}