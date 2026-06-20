import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  const switchMode = (mode) => {
    setCurrentState(mode);
    setErrors({});
    setName("");
    setPassword("");
    setEmail("");
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Введите email";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!password) {
      newErrors.password = "Введите пароль";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен быть минимум 6 символов";
    }

    if (currentState === "Sign Up") {
      if (!name) {
        newErrors.name = "Введите имя";
      } else if (name.length < 2) {
        newErrors.name = "Имя должно быть минимум 2 символа";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Исправьте ошибки в форме");
      return;
    }

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Ошибка сервера");
    }
  };

  useEffect(() => {
    if (errors.email && email) {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  }, [email]);

  useEffect(() => {
    if (errors.password && password) {
      setErrors((prev) => ({ ...prev, password: null }));
    }
  }, [password]);

  useEffect(() => {
    if (errors.name && name) {
      setErrors((prev) => ({ ...prev, name: null }));
    }
  }, [name]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-8 rounded-lg shadow-md"
      >
        <div className="inline-flex items-center gap-2 mt-2 mb-4">
          <p className="text-3xl font-medium">
            {currentState === "Login" ? "Вход" : "Регистрация"}
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === "Sign Up" && (
          <div className="w-full">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={`w-full px-3 py-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-black`}
              placeholder="Имя"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
        )}

        <div className="w-full">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Пароль (мин. 6 символов)"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex justify-between w-full text-sm mt-[-8px]">
          <p className="text-gray-500 cursor-pointer hover:text-black">
            Забыли пароль?
          </p>
          {currentState === "Login" ? (
            <p
              onClick={() => switchMode("Sign Up")}
              className="text-gray-500 cursor-pointer hover:text-black"
            >
              Создать аккаунт
            </p>
          ) : (
            <p
              onClick={() => switchMode("Login")}
              className="text-gray-500 cursor-pointer hover:text-black"
            >
              Войти
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 font-medium text-white transition bg-black rounded hover:bg-gray-800"
        >
          {currentState === "Login" ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
