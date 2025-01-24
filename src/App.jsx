import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import Logo from "./assets/trans_bg.png";

const App = () => {
  const [order, setOrder] = useState({});
  const [message, setMessage] = useState("");

  const menu = [
    { name: "Бутерброд с паштетом и маслом", image: "https://lh5.googleusercontent.com/-L5J_07sFnv8/TkDibd0zUzI/AAAAAAAAAqY/qMO0qlKBP58/s800/702838_215831703.jpg", id: 1 },
    { name: "Яишница", image: "https://img.iamcook.ru/2024/upl/recipes/cat/u-6e88aa2cf993846ce8695f1e1c02a733.JPG", id: 2 },
    { name: "Блинчики с любовью (NEW)", image: "https://img.iamcook.ru/2018/upl/recipes/cat/u-3d24feaaf1bf12fd18e3544eb0bfbb8a.JPG", id: 3 },
    { name: "Бутерброд с колбаской", image: "https://calorizator.ru/sites/default/files/imagecache/recipes_full/recipe/32319.jpg", id: 4 },
    { name: "Чай в красивой кружке", image: "https://img.freepik.com/premium-photo/cup-tea-beautiful-cup_155165-10976.jpg", id: 5 },
  ];

  const handleOrder = (item) => {
    setOrder((prev) => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
  };

  const handleRemoveItem = (item) => {
    setOrder((prev) => {
      const updatedOrder = { ...prev };
      if (updatedOrder[item.name] > 1) {
        updatedOrder[item.name] -= 1;
      } else {
        delete updatedOrder[item.name];
      }
      return updatedOrder;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderDetails = Object.entries(order)
      .map(([item, quantity]) => `${item}: ${quantity}`)
      .join(", ");

    emailjs
      .send("service_lxxmm8s", "template_il5cfqr", { order: orderDetails }, "Df4zcv3Cqe2LtutdW")
      .then(
        () => {
          setMessage("Спасибо за ваш заказ, повар Ято уже начал его готовить.");
          setOrder({});
        },
        (error) => console.error("EmailJS Error: ", error)
      );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center justify-center gap-4">
            <motion.img
              src={Logo}
              alt="Logo"
              className="h-64 w-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex flex-col">
              <motion.h1
                className="block text-gray-800 text-2xl md:text-4xl font-bold"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                Ресторан
              </motion.h1>
              <motion.h1
                className="text-2xl md:text-4xl font-bold"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                "Завтрак с Морковкой Питеровной"
              </motion.h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col flex-grow bg-gradient-to-r from-orange-50 to-orange-100">
        <motion.a
          href="#menu"
          className="bg-orange-500 text-white px-6 py-2 rounded-full self-center mt-6 hover:bg-orange-600 transition shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Перейти к меню
        </motion.a>

        <main id="menu" className="container mx-auto mt-8 flex-grow">
          <motion.h2
            className="text-center text-3xl text-orange-500 font-semibold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Наше меню
          </motion.h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-center text-orange-500">
                    {item.name}
                  </h3>
                  <div className="flex justify-center items-center gap-2">
                    {order[item.name] > 0 && (
                      <span className="font-bold text-orange-500">
                        {order[item.name]}
                      </span>
                    )}
                    <button
                      onClick={() => handleOrder(item)}
                      className="block bg-orange-500 text-white mt-4 mx-auto px-6 py-2 rounded hover:bg-orange-600 transition"
                    >
                      Добавить
                    </button>
                    {order[item.name] > 0 && (
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="block bg-red-500 text-white mt-4 mx-auto px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        <motion.form
          onSubmit={handleSubmit}
          className="container mx-auto p-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl text-orange-500 font-semibold mb-4">Ваш заказ</h3>
          {Object.keys(order).length > 0 ? (
            <ul className="mb-4">
              {Object.entries(order).map(([item, quantity]) => (
                <li
                  key={item}
                  className="flex justify-between items-center border-b py-2 text-lg"
                >
                  <span className="text-black">{item}</span>
                  <span className="font-bold text-orange-500">{quantity}</span>
                  <button
                    onClick={() => handleRemoveItem({ name: item })}
                    className="text-red-500 ml-4"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Вы еще ничего не выбрали.</p>
          )}
          <button
            type="submit"
            className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition"
            disabled={Object.keys(order).length === 0}
          >
            Заказать
          </button>
        </motion.form>

        {message && (
          <div className="fixed inset-0 bg-opacity-50 bg-gray-800 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="text-xl text-orange-500">{message}</h3>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-blue-600"
              >
                Ок
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
