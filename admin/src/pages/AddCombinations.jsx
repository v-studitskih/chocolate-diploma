import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function AddCombination({ token }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(false);
  
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedFillings, setSelectedFillings] = useState([]);
  const [selectedDecors, setSelectedDecors] = useState([]);
  const [selectedPackaging, setSelectedPackaging] = useState("");
  

  const [forms, setForms] = useState([]);
  const [bases, setBases] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [decors, setDecors] = useState([]);
  const [packagings, setPackagings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOptions = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        const allProducts = response.data.products;
        setForms(allProducts.filter(p => p.category === "form" && p.isAvailable));
        setBases(allProducts.filter(p => p.category === "base" && p.isAvailable));
        setFillings(allProducts.filter(p => p.category === "filling" && p.isAvailable));
        setDecors(allProducts.filter(p => p.category === "decor" && p.isAvailable));
        setPackagings(allProducts.filter(p => p.category === "packaging" && p.isAvailable));
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка загрузки опций");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedForm || !selectedBase || !selectedPackaging) {
      toast.error("Выберите форму, основу и упаковку");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("isActive", true);
      
      const options = {
        form: selectedForm,
        base: selectedBase,
        filling: selectedFillings,
        decor: selectedDecors,
        packaging: selectedPackaging
      };
      formData.append("options", JSON.stringify(options));
      
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        backendUrl + "/api/combinations/add",
        formData,
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success("Комбинация добавлена");
        setName("");
        setDescription("");
        setPrice("");
        setImage(false);
        setSelectedForm("");
        setSelectedBase("");
        setSelectedFillings([]);
        setSelectedDecors([]);
        setSelectedPackaging("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleMultipleSelect = (id, selectedList, setSelectedList) => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter(item => item !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Загрузка...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start w-full gap-4">
      <div>
        <p className="mb-2">Изображение</p>
        <label htmlFor="image">
          <img
            className="w-32 cursor-pointer"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            accept="image/*"
          />
        </label>
      </div>
      
      <div className="w-full">
        <p className="mb-2">Название комбинации</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Например: Романтический вечер"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Описание</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Краткое описание комбинации..."
          rows="3"
          required
        />
      </div>

     
      <div className="w-full">
        <p className="mb-2">Цена</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full max-w-[200px] px-3 py-2 border rounded"
          type="number"
          placeholder="250"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Форма</p>
        <select
          onChange={(e) => setSelectedForm(e.target.value)}
          value={selectedForm}
          className="w-full max-w-[300px] px-3 py-2 border rounded"
          required
        >
          <option value="">Выберите форму</option>
          {forms.map(form => (
            <option key={form._id} value={form._id}>{form.name}</option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Основа</p>
        <select
          onChange={(e) => setSelectedBase(e.target.value)}
          value={selectedBase}
          className="w-full max-w-[300px] px-3 py-2 border rounded"
          required
        >
          <option value="">Выберите основу</option>
          {bases.map(base => (
            <option key={base._id} value={base._id}>{base.name}</option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Начинка</p>
        <div className="flex flex-wrap gap-3 max-w-[500px]">
          {fillings.map(filling => (
            <label key={filling._id} className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFillings.includes(filling._id)}
                onChange={() => handleMultipleSelect(filling._id, selectedFillings, setSelectedFillings)}
              />
              <span className="text-sm">{filling.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Декор</p>
        <div className="flex flex-wrap gap-3 max-w-[500px]">
          {decors.map(decor => (
            <label key={decor._id} className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDecors.includes(decor._id)}
                onChange={() => handleMultipleSelect(decor._id, selectedDecors, setSelectedDecors)}
              />
              <span className="text-sm">{decor.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Упаковка</p>
        <select
          onChange={(e) => setSelectedPackaging(e.target.value)}
          value={selectedPackaging}
          className="w-full max-w-[300px] px-3 py-2 border rounded"
          required
        >
          <option value="">Выберите упаковку</option>
          {packagings.map(pack => (
            <option key={pack._id} value={pack._id}>{pack.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="py-3 mt-4 text-white transition bg-black rounded w-28 hover:bg-gray-800"
      >
        ДОБАВИТЬ
      </button>
    </form>
  );
}