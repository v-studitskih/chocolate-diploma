import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

export default function CombinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, addToCart, currency, products } = useContext(ShopContext);
  
  const [combination, setCombination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const getOptionDetails = (options) => {
    if (!options) return { form: null, base: null, filling: [], decor: [], packaging: null };
    
    const details = {
      form: null,
      base: null,
      filling: [],
      decor: [],
      packaging: null
    };

    if (options.form) {
      details.form = products.find(p => p._id === options.form);
    }
    if (options.base) {
      details.base = products.find(p => p._id === options.base);
    }
    if (options.filling?.length > 0) {
      details.filling = options.filling.map(id => products.find(p => p._id === id)).filter(Boolean);
    }
    if (options.decor?.length > 0) {
      details.decor = options.decor.map(id => products.find(p => p._id === id)).filter(Boolean);
    }
    if (options.packaging) {
      details.packaging = products.find(p => p._id === options.packaging);
    }

    return details;
  };

  useEffect(() => {
    const fetchCombination = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/combinations/${id}`
        );
        if (response.data.success) {
          const data = response.data.combination;
          setCombination(data);
          
          const img = data.image;
          if (Array.isArray(img) && img.length > 0) {
            setImage(img[0]);
          } else if (typeof img === 'string') {
            setImage(img);
          } else {
            setImage("/placeholder.jpg");
          }
        } else {
          toast.error("Комбинация не найдена");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        toast.error("Ошибка загрузки");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchCombination();
  }, [id, navigate, backendUrl]);

  const optionDetails = combination ? getOptionDetails(combination.options) : null;

  const handleAddToCart = () => {
    if (!combination) return;
    
    addToCart(
      `comb_${combination._id}`,
      combination,
      combination.price * quantity,
      combination.image || "/placeholder.jpg"
    );
    
    toast.success("Добавлено в корзину!");
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0) setQuantity(val);
  };

  const getImageArray = () => {
    if (!combination?.image) return ["/placeholder.jpg"];
    if (Array.isArray(combination.image)) {
      return combination.image.length > 0 ? combination.image : ["/placeholder.jpg"];
    }
    return [combination.image];
  };

  const imageArray = getImageArray();

  if (loading) {
    return <div className="pt-10 text-center">Загрузка...</div>;
  }

  if (!combination) {
    return (
      <div className="pt-20 text-center">
        <p className="text-gray-500">Комбинация не найдена</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {imageArray.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-gray-400 rounded"
                alt=""
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-lg"
              src={image || "/placeholder.jpg"}
              alt={combination.name}
              onError={(e) => {
                e.target.src = "/placeholder.jpg";
              }}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-2 text-sm text-gray-500">
            Готовая комбинация
          </div>
          <h1 className="text-2xl font-medium">{combination.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(45 отзывов)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {combination.price} {currency}
          </p>

          <p className="mt-3 text-sm italic text-gray-400">
            Готовая идея для вдохновения
          </p>

          {optionDetails && (
            <div className="p-4 mt-8 rounded-lg bg-gray-50">
              <p className="mb-2 text-sm font-medium text-gray-600">Состав:</p>
              <div className="space-y-1 text-sm">
                {optionDetails.form && (
                  <p>
                    <span className="text-gray-500">Форма:</span>{" "}
                    <span className="font-medium">{optionDetails.form.name}</span>
                  </p>
                )}
                {optionDetails.base && (
                  <p>
                    <span className="text-gray-500">Основа:</span>{" "}
                    <span className="font-medium">{optionDetails.base.name}</span>
                  </p>
                )}
                {optionDetails.filling.length > 0 && (
                  <p>
                    <span className="text-gray-500">Начинка:</span>{" "}
                    <span className="font-medium">
                      {optionDetails.filling.map(f => f.name).join(", ")}
                    </span>
                  </p>
                )}
                {optionDetails.decor.length > 0 && (
                  <p>
                    <span className="text-gray-500">Декор:</span>{" "}
                    <span className="font-medium">
                      {optionDetails.decor.map(d => d.name).join(", ")}
                    </span>
                  </p>
                )}
                {optionDetails.packaging && (
                  <p>
                    <span className="text-gray-500">Упаковка:</span>{" "}
                    <span className="font-medium">{optionDetails.packaging.name}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 text-sm text-white transition bg-black rounded hover:bg-gray-800"
              >
                ДОБАВИТЬ В КОРЗИНУ
              </button>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Кол-во:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 px-2 py-1 text-center border rounded"
                />
              </div>
            </div>
          </div>

          <hr className="mt-8 sm:w-4/5" />

          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>✓ 100% натуральные ингредиенты</p>
            <p>✓ Ручная работа</p>
            <p>✓ Доставка по всей России</p>
            <p>✓ Возврат в течение 14 дней</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <p className="px-5 py-3 text-sm border rounded-tl">Описание</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border rounded-bl rounded-br">
          <p>{combination.description}</p>
          <p className="mt-2">
            Эта комбинация уже собрана для вас. Вы можете добавить её в корзину
            или собрать свою уникальную комбинацию в нашем
            <button
              onClick={() => navigate("/customize")}
              className="ml-1 text-gray-800 hover:underline"
            >
              конструкторе
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}