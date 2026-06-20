import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const OptionCard = ({ 
  option, 
  category, 
  multiple, 
  isSelected, 
  onSelect, 
  backendUrl, 
  currency 
}) => {
  const navigate = useNavigate();
  const selected = isSelected(category, option);
  
  const handleClick = useCallback(() => {
    onSelect(category, option, multiple);
  }, [category, option, multiple, onSelect]);

  const handleDetailsClick = useCallback((e) => {
    e.stopPropagation();
    navigate(`/product/${option._id}`);
  }, [navigate, option._id]);

  return (
    <div
      className={`border rounded-lg p-3 cursor-pointer transition-all ${
        selected ? "border-gray-900 bg-gray-100" : "border-gray-200 hover:border-gray-400"
      }`}
      onClick={handleClick}
    >
      <div className="mb-2 overflow-hidden rounded-md">
        <img
          src={`${backendUrl}${option.image[0]}`}
          alt={option.name}
          width="185"
          height="185"
          className="object-cover w-full h-32 pointer-events-none"
        />
      </div>
      <p className="text-sm font-medium text-center">{option.name}</p>
      <p className="text-xs text-center text-gray-500">+{option.price} {currency}</p>
      <button
        onClick={handleDetailsClick}
        className="w-full mt-2 text-xs text-center text-gray-600 transition-colors hover:text-gray-900"
      >
        подробнее →
      </button>
    </div>
  );
};

OptionCard.displayName = "OptionCard";

export default OptionCard;