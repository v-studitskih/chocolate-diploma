import React from "react";

const SelectedSummary = React.memo(({ 
  selectedText, 
  totalPrice, 
  currency, 
  onClear, 
  onAddToCart 
}) => {
  return (
    <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
      <div className="mb-3 text-sm text-gray-600">
        <span className="font-medium">ВЫБРАНО:</span> {selectedText}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-2xl font-bold">ИТОГО: {totalPrice} {currency}</div>
        <div className="flex gap-3">
          <button
            onClick={onClear}
            className="px-6 py-2 text-sm text-gray-700 transition border border-gray-300 rounded hover:bg-gray-100"
          >
            ОЧИСТИТЬ ВСЁ
          </button>
          <button
            onClick={onAddToCart}
            className="px-6 py-2 text-sm text-white transition bg-black rounded hover:bg-gray-800"
          >
            ДОБАВИТЬ В КОРЗИНУ
          </button>
        </div>
      </div>
    </div>
  );
});

SelectedSummary.displayName = "SelectedSummary";

export default SelectedSummary;