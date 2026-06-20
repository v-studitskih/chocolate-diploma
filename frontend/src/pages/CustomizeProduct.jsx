import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useCustomizeOptions } from "../hooks/useCustomizeOptions";
import CustomizeHeader from "../components/CustomizeHeader";
import OptionSection from "../components/OptionSection";
import SelectedSummary from "../components/SelectedSummary";
import { toast } from "react-toastify";

const OPTION_CATEGORIES = [
  { key: "forms", title: "ФОРМА", category: "form" },
  { key: "bases", title: "ОСНОВА", category: "base" },
  { key: "fillings", title: "НАЧИНКА", category: "filling", multiple: true },
  { key: "decors", title: "ДЕКОР", category: "decor", multiple: true },
  { key: "packagings", title: "УПАКОВКА", category: "packaging" },
];

export default function CustomizeProduct() {
  const { products, addToCart, currency, navigate, backendUrl } = useContext(ShopContext);
  
  const {
    selectedOptions,
    categorizedProducts,
    handleSelect,
    isSelected,
    getTotalPrice,
    generateItemId,
    getSelectedText,
    clearAll,
    loadPreselected,
  } = useCustomizeOptions(products);

  useEffect(() => {
    const saved = localStorage.getItem("preselectedOptions");
    if (saved) {
      const preselectedOptions = JSON.parse(saved);
      loadPreselected(preselectedOptions, products);
    }
  }, [products, loadPreselected]);

  const handleAddToCart = () => {
    if (!selectedOptions.form) return toast.error("Выберите форму");
    if (!selectedOptions.base) return toast.error("Выберите основу");
    if (!selectedOptions.packaging) return toast.error("Выберите упаковку");
    
    addToCart(
      generateItemId(), 
      selectedOptions, 
      getTotalPrice(), 
      selectedOptions.form?.image?.[0]
    );
  };

  const handleClearAll = () => {
    clearAll();
    localStorage.removeItem("preselectedOptions");
  };

  return (
    <main className="flex flex-col gap-1 pt-10 border-t" role="main">
      <CustomizeHeader />

      <div className="w-full max-w-6xl px-4 mx-auto">
        {OPTION_CATEGORIES.map(({ key, title, category, multiple }) => (
          <OptionSection
            key={category}
            title={title}
            options={categorizedProducts[key]}
            category={category}
            multiple={multiple}
            isSelected={isSelected}
            onSelect={handleSelect}
            backendUrl={backendUrl}
            currency={currency}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl px-4 mx-auto mt-8">
        <SelectedSummary
          selectedText={getSelectedText()}
          totalPrice={getTotalPrice()}
          currency={currency}
          onClear={handleClearAll}
          onAddToCart={handleAddToCart}
        />
      </div>
    </main>
  );
}