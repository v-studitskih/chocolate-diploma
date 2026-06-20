import { useState, useMemo, useCallback } from "react";

const SINGLE_CATEGORIES = ["form", "base", "packaging"];
const MULTIPLE_CATEGORIES = ["filling", "decor"];

export const useCustomizeOptions = (products) => {
  const [selectedOptions, setSelectedOptions] = useState({
    form: null,
    base: null,
    filling: [],
    decor: [],
    packaging: null,
  });

  const categorizedProducts = useMemo(() => ({
    forms: products.filter(p => p.category === "form" && p.isAvailable),
    bases: products.filter(p => p.category === "base" && p.isAvailable),
    fillings: products.filter(p => p.category === "filling" && p.isAvailable),
    decors: products.filter(p => p.category === "decor" && p.isAvailable),
    packagings: products.filter(p => p.category === "packaging" && p.isAvailable),
  }), [products]);

  const handleSelectSingle = useCallback((category, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: prev[category]?._id === option._id ? null : option
    }));
  }, []);

  const handleSelectMultiple = useCallback((category, option) => {
    setSelectedOptions(prev => {
      const current = prev[category];
      return current.some(item => item._id === option._id)
        ? { ...prev, [category]: current.filter(item => item._id !== option._id) }
        : { ...prev, [category]: [...current, option] };
    });
  }, []);

  const handleSelect = useCallback((category, option, multiple) => {
    if (multiple) {
      handleSelectMultiple(category, option);
    } else {
      handleSelectSingle(category, option);
    }
  }, [handleSelectSingle, handleSelectMultiple]);

  const isSelected = useCallback((category, option) => {
    if (MULTIPLE_CATEGORIES.includes(category)) {
      return selectedOptions[category].some(item => item._id === option._id);
    }
    return selectedOptions[category]?._id === option._id;
  }, [selectedOptions]);

  const getTotalPrice = useCallback(() => {
    let total = 0;
    if (selectedOptions.form) total += selectedOptions.form.price;
    if (selectedOptions.base) total += selectedOptions.base.price;
    selectedOptions.filling.forEach(f => total += f.price);
    selectedOptions.decor.forEach(d => total += d.price);
    if (selectedOptions.packaging) total += selectedOptions.packaging.price;
    return total;
  }, [selectedOptions]);

  const generateItemId = useCallback(() => {
    const { form, base, filling, decor, packaging } = selectedOptions;
    if (!form || !base || !packaging) return null;
    const fillingIds = filling.map(f => f._id).sort().join(',');
    const decorIds = decor.map(d => d._id).sort().join(',');
    return `${form._id}_${base._id}_[${fillingIds}]_[${decorIds}]_${packaging._id}`;
  }, [selectedOptions]);

  const getSelectedText = useCallback(() => {
    const parts = [];
    if (selectedOptions.form) parts.push(selectedOptions.form.name);
    if (selectedOptions.base) parts.push(selectedOptions.base.name);
    if (selectedOptions.filling.length) {
      parts.push(`нач: ${selectedOptions.filling.map(f => f.name).join(", ")}`);
    }
    if (selectedOptions.decor.length) {
      parts.push(`дек: ${selectedOptions.decor.map(d => d.name).join(", ")}`);
    }
    if (selectedOptions.packaging) parts.push(selectedOptions.packaging.name);
    return parts.length > 0 ? parts.join(" · ") : "—";
  }, [selectedOptions]);

  const clearAll = useCallback(() => {
    setSelectedOptions({ 
      form: null, 
      base: null, 
      filling: [], 
      decor: [], 
      packaging: null 
    });
  }, []);

  const loadPreselected = useCallback((preselectedOptions, products) => {
    if (!preselectedOptions || products.length === 0) return;
    
    const newSelected = {
      form: null,
      base: null,
      filling: [],
      decor: [],
      packaging: null,
    };
    
    preselectedOptions.forEach(({ category, optionId }) => {
      const option = products.find(p => p._id === optionId && p.category === category);
      if (!option) return;
      
      if (MULTIPLE_CATEGORIES.includes(category)) {
        if (!newSelected[category].some(item => item._id === option._id)) {
          newSelected[category].push(option);
        }
      } else {
        newSelected[category] = option;
      }
    });
    setSelectedOptions(newSelected);
  }, []);

  return {
    selectedOptions,
    categorizedProducts,
    handleSelect,
    isSelected,
    getTotalPrice,
    generateItemId,
    getSelectedText,
    clearAll,
    loadPreselected,
  };
};