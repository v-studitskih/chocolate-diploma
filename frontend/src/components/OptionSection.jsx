import React from "react";
import OptionCard from "./OptionCard";

const OptionSection = React.memo(({ 
  title, 
  options, 
  category, 
  multiple = false,
  isSelected,
  onSelect,
  backendUrl,
  currency
}) => {
  if (options.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="mb-4 text-lg font-medium">
        {title}
        {multiple && <span className="ml-2 text-sm text-gray-500">(можно несколько)</span>}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {options.map((option) => (
          <OptionCard
            key={option._id}
            option={option}
            category={category}
            multiple={multiple}
            isSelected={isSelected}
            onSelect={onSelect}
            backendUrl={backendUrl}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
});

OptionSection.displayName = "OptionSection";

export default OptionSection;