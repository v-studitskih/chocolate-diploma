import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₽";
  const delivery_fee = 300;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [popularCombinations, setPopularCombinations] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Добавление  в корзину
  const addToCart = async (itemId, customization, totalPrice, image) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId].quantity = (cartData[itemId].quantity || 1) + 1;
    } else {
      cartData[itemId] = {
        productName: "Кастомный шоколад",
        quantity: 1,
        customization: customization || {},
        totalPrice: Number(totalPrice) || 0,
        image: image || "",
      };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, customization, totalPrice: Number(totalPrice) || 0, image },
          { headers: { token } },
        );
        toast.success("Добавлено в корзину");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.success("Добавлено в корзину");
    }
  };

  // Получить общее количество товаров в корзине
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      if (item && typeof item.quantity === "number") {
        totalCount += item.quantity;
      }
    }
    return totalCount;
  };

  // Обновить количество товара
  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      if (cartData[itemId]) {
        cartData[itemId].quantity = Number(quantity);
      }
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.put(
          backendUrl + "/api/cart/" + itemId,
          { quantity: Number(quantity) },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Получить общую сумму корзины
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      if (item) {
        const price = Number(item.totalPrice) || 0;
        const qty = Number(item.quantity) || 0;
        totalAmount += price * qty;
      }
    }
    return totalAmount;
  };

  // Получить все опции 
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Получить популярные комбинации
  const getPopularCombinations = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/combinations/list");
      if (response.data.success) {
        setPopularCombinations(response.data.combinations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Получить корзину пользователя
  const getUserCart = async (token) => {
    try {
      const response = await axios.get(
        backendUrl + "/api/cart",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsData();
    getPopularCombinations();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    popularCombinations,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
