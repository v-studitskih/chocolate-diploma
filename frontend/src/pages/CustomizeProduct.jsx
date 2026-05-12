import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { toast } from "react-toastify";

export default function CustomizeProduct() {
  const { products, addToCart, currency, navigate } = useContext(ShopContext);

  const [selectedOptions, setSelectedOptions] = useState({
    form: null,
    base: null,
    filling: [],
    decor: [],
    packaging: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem("preselectedOptions");
    if (saved && products.length > 0) {
      const preselectedOptions = JSON.parse(saved);
      
      let newSelected = {
        form: null,
        base: null,
        filling: [],
        decor: [],
        packaging: null,
      };
      
      preselectedOptions.forEach(({ category, optionId, size }) => {
        const option = products.find(p => p._id === optionId && p.category === category);
        if (!option) return;
        
        if (category === "filling" || category === "decor") {
          if (!newSelected[category].some(item => item._id === option._id)) {
            newSelected[category].push(option);
          }
        } else {
          newSelected[category] = option;
        }
      });
      
      setSelectedOptions(newSelected);

    }
  }, [products]);

  const forms = products.filter(p => p.category === "form" && p.isAvailable);
  const bases = products.filter(p => p.category === "base" && p.isAvailable);
  const fillings = products.filter(p => p.category === "filling" && p.isAvailable);
  const decors = products.filter(p => p.category === "decor" && p.isAvailable);
  const packagings = products.filter(p => p.category === "packaging" && p.isAvailable);

  const handleSelectSingle = (category, option) => {
    setSelectedOptions(prev => {
      if (prev[category]?._id === option._id) {
        // Если уже выбрана — снимаем выбор
        return { ...prev, [category]: null };
      } else {
        // Если не выбрана — выбираем
        return { ...prev, [category]: option };
      }
    });
  };

  // Выбор опции (множественный) — toggle
  const handleSelectMultiple = (category, option) => {
    setSelectedOptions(prev => {
      const current = prev[category];
      if (current.some(item => item._id === option._id)) {
        // Если уже выбрана — убираем
        return { ...prev, [category]: current.filter(item => item._id !== option._id) };
      } else {
        // Если не выбрана — добавляем
        return { ...prev, [category]: [...current, option] };
      }
    });
  };

  const isSelected = (category, option) => {
    if (category === "filling" || category === "decor") {
      return selectedOptions[category].some(item => item._id === option._id);
    }
    return selectedOptions[category]?._id === option._id;
  };

  const getTotalPrice = () => {
    let total = 0;
    if (selectedOptions.form) total += selectedOptions.form.price;
    if (selectedOptions.base) total += selectedOptions.base.price;
    selectedOptions.filling.forEach(f => total += f.price);
    selectedOptions.decor.forEach(d => total += d.price);
    if (selectedOptions.packaging) total += selectedOptions.packaging.price;
    return total;
  };

  const generateItemId = () => {
    const { form, base, filling, decor, packaging } = selectedOptions;
    if (!form || !base || !packaging) return null;
    const fillingIds = filling.map(f => f._id).sort().join(',');
    const decorIds = decor.map(d => d._id).sort().join(',');
    return `${form._id}_${base._id}_[${fillingIds}]_[${decorIds}]_${packaging._id}`;
  };

  const handleAddToCart = () => {
    if (!selectedOptions.form) {
      toast.error("Выберите форму");
      return;
    }
    if (!selectedOptions.base) {
      toast.error("Выберите основу");
      return;
    }
    if (!selectedOptions.packaging) {
      toast.error("Выберите упаковку");
      return;
    }

    const itemId = generateItemId();
    const totalPrice = getTotalPrice();
    const image = selectedOptions.form?.image?.[0];

    addToCart(itemId, selectedOptions, totalPrice, image);
  };

  const handleClearAll = () => {
    setSelectedOptions({
      form: null,
      base: null,
      filling: [],
      decor: [],
      packaging: null,
    });
    localStorage.removeItem("preselectedOptions");
  };

  const OptionCard = ({ option, category, multiple }) => {
    const selected = isSelected(category, option);
    
    const handleCardClick = () => {
      if (multiple) {
        handleSelectMultiple(category, option);
      } else {
        handleSelectSingle(category, option);
      }
    };


    return (
      <div
        className={`border rounded-lg p-3 cursor-pointer transition-all ${
          selected
            ? "border-gray-900 bg-gray-100"
            : "border-gray-200 hover:border-gray-400"
        }`}
        onClick={handleCardClick}
      >
        <div className="mb-2 overflow-hidden rounded-md">
          <img
            src={`http://localhost:4000${option.image[0]}`}
            alt={option.name}
            className="object-cover w-full h-32 pointer-events-none"
          />
        </div>
        <p className="text-sm font-medium text-center">{option.name}</p>
        <p className="text-xs text-center text-gray-500">
          +{option.price} {currency}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${option._id}`);
          }}
          className="w-full mt-2 text-xs text-center text-gray-400 hover:text-gray-600"
        >
          подробнее →
        </button>
      </div>
    );
  };

  const OptionSection = ({ title, options, category, multiple = false }) => (
    <div className="mb-10">
      <h2 className="mb-4 text-lg font-medium">
        {title}
        {multiple && <span className="ml-2 text-sm text-gray-400">(можно несколько)</span>}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {options.map((option) => (
          <OptionCard
            key={option._id}
            option={option}
            category={category}
            multiple={multiple}
          />
        ))}
      </div>
    </div>
  );

  const getSelectedText = () => {
    const parts = [];
    if (selectedOptions.form) parts.push(selectedOptions.form.name);
    if (selectedOptions.base) parts.push(selectedOptions.base.name);
    if (selectedOptions.filling.length) parts.push(`нач: ${selectedOptions.filling.map(f => f.name).join(", ")}`);
    if (selectedOptions.decor.length) parts.push(`дек: ${selectedOptions.decor.map(d => d.name).join(", ")}`);
    if (selectedOptions.packaging) parts.push(selectedOptions.packaging.name);
    return parts.length > 0 ? parts.join(" · ") : "—";
  };

  return (
    <div className="flex flex-col gap-1 pt-10 border-t">
      <div className="mb-8 text-center">
        <Title text1={"СОБЕРИ"} text2={"СВОЙ ШОКОЛАД"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Выбери форму, основу, начинку, декор и упаковку
        </p>
      </div>

      <div className="w-full max-w-6xl px-4 mx-auto">
        <OptionSection title="ФОРМА" options={forms} category="form" />
        <OptionSection title="ОСНОВА" options={bases} category="base" />
        <OptionSection title="НАЧИНКА" options={fillings} category="filling" multiple />
        <OptionSection title="ДЕКОР" options={decors} category="decor" multiple />
        <OptionSection title="УПАКОВКА" options={packagings} category="packaging" />
      </div>

      <div className="w-full max-w-6xl px-4 mx-auto mt-8">
        <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
          <div className="mb-3 text-sm text-gray-600">
            <span className="font-medium">ВЫБРАНО:</span> {getSelectedText()}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-2xl font-bold">
              ИТОГО: {getTotalPrice()} {currency}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClearAll}
                className="px-6 py-2 text-sm text-gray-700 transition border border-gray-300 rounded hover:bg-gray-100"
              >
                ОЧИСТИТЬ ВСЁ
              </button>
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 text-sm text-white transition bg-black rounded hover:bg-gray-800"
              >
                ДОБАВИТЬ В КОРЗИНУ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}