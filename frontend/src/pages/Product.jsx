import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const { productId } = useParams();
  const { products, currency, navigate, backendUrl } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

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

  const getShortDescription = (category) => {
    const texts = {
      form: "Выберите форму для вашего идеального шоколада",
      base: "Основа, которая задаст главный вкус",
      filling: "Добавьте любимую начинку внутрь шоколада",
      decor: "Украсьте шоколад по своему вкусу",
      packaging: "Красивая упаковка завершит образ подарка",
    };
    return texts[category] || "Идеальный выбор для вашего шоколада";
  };

  const handleSelectInConstructor = () => {
    if (
      (productData.category === "form" || productData.category === "base") &&
      !selectedSize
    ) {
      toast.error("Пожалуйста, выберите вес");
      return;
    }

    const saved = localStorage.getItem("preselectedOptions");
    let preselectedOptions = saved ? JSON.parse(saved) : [];

    const existingIndex = preselectedOptions.findIndex(
      (opt) =>
        opt.category === productData.category &&
        opt.optionId === productData._id,
    );

    if (existingIndex === -1) {
      preselectedOptions.push({
        category: productData.category,
        optionId: productData._id,
        size: selectedSize,
      });
    } else {
      preselectedOptions[existingIndex].size = selectedSize;
      toast.info(`Опция "${productData.name}" уже выбрана`);
      return;
    }

    localStorage.setItem(
      "preselectedOptions",
      JSON.stringify(preselectedOptions),
    );

    toast.success(`Опция "${productData.name}" добавлена в конструктор`);
    navigate("/customize");
  };

  if (!productData) {
    return <div className="pt-10 text-center">Загрузка...</div>;
  }

  return (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                 src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-gray-400 rounded"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-lg"
              src={image}
              alt=""
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-2 text-sm text-gray-500">
            {getCategoryName(productData.category)}
          </div>
          <h1 className="text-2xl font-medium">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(45 отзывов)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            +{productData.price} {currency}
          </p>

          <p className="mt-3 text-sm italic text-gray-400">
            {getShortDescription(productData.category)}
          </p>

          {(productData.category === "form" ||
            productData.category === "base") &&
            productData.sizes?.length > 0 && (
              <div className="flex flex-col gap-4 mt-8 mb-8">
                <p>Выберите вес:</p>
                <div className="flex gap-2">
                  {productData.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(item)}
                      className={`px-4 py-2 border rounded transition ${
                        selectedSize === item
                          ? "bg-black text-white border-black"
                          : "bg-gray-100 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

          <div className="mt-8">
            <button
              onClick={handleSelectInConstructor}
              className="px-8 py-3 text-sm text-white transition bg-black rounded hover:bg-gray-800"
            >
              ВЫБРАТЬ
            </button>
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
          <p>{productData.description}</p>
          <p className="mt-2">
            Эта опция идеально подходит для создания уникального шоколада ручной
            работы. Вы можете комбинировать её с другими ингредиентами и
            украшениями в нашем
            <button
              onClick={() => navigate("/collection")}
              className="ml-1 text-gray-800 hover:underline"
            >
              конструкторе
            </button>
            .
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        currentProductId={productData._id}
      />
    </div>
  );
}
