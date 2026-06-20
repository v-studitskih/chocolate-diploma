import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("form");
  const [sizes, setSizes] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [defaultOption, setDefaultOption] = useState(false);
  const [popularity, setPopularity] = useState(false);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("isAvailable", isAvailable);
      formData.append("defaultOption", defaultOption);
      formData.append("popularity", popularity);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setIsAvailable(true);
        setDefaultOption(false);
        setPopularity(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmithandler}
      className="flex flex-col items-start w-full gap-3"
    >
      <div>
        <p className="mb-2">Загрузить изображение</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Название опции</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Например: Сердце, Тёмный 70%, Карамель"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Описание</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Подробное описание опции..."
          required
        />
      </div>

      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2">Категория</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-2 py-2 border rounded"
          >
            <option value="form">Форма</option>
            <option value="base">Основа</option>
            <option value="filling">Начинка</option>
            <option value="decor">Декор</option>
            <option value="packaging">Упаковка</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Цена (доп. стоимость)</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border rounded sm:w-[120px]"
            type="number"
            placeholder="0"
          />
        </div>
      </div>

      {(category === "form" || category === "base") && (
        <div>
          <p className="mb-2">Вес/Размеры</p>
          <div className="flex gap-3">
            {["250г", "500г"].map((size) => (
              <div
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
              >
                <p
                  className={`px-3 py-1 cursor-pointer rounded ${
                    sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                  }`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex gap-2">
          <input
            onChange={() => setIsAvailable((prev) => !prev)}
            checked={isAvailable}
            type="checkbox"
            id="isAvailable"
          />
          <label className="cursor-pointer" htmlFor="isAvailable">
            Доступно для выбора
          </label>
        </div>

        <div className="flex gap-2">
          <input
            onChange={() => setDefaultOption((prev) => !prev)}
            checked={defaultOption}
            type="checkbox"
            id="defaultOption"
          />
          <label className="cursor-pointer" htmlFor="defaultOption">
            Выбрано по умолчанию (по одному на категорию)
          </label>
        </div>

        <div className="flex gap-2">
          <input
            onChange={() => setPopularity((prev) => !prev)}
            checked={popularity}
            type="checkbox"
            id="popularity"
          />
          <label className="cursor-pointer" htmlFor="popularity">
            Топ ингредиент
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="py-3 mt-4 text-white bg-black rounded w-28"
      >
        ADD
      </button>
    </form>
  );
}