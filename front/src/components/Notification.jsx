import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

const Notification = ({ show, onClose, type = "success", title, message }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setProgress(100);
      const duration = type === "success" ? 3000 : 5000;
      const interval = 50; // Actualizar cada 50ms
      const decrement = (100 * interval) / duration;

      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - decrement;
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [show, type]);
  return (
    <Transition
      appear
      show={show}
      as={Fragment}
      enter="transition-all duration-500 ease-out"
      enterFrom="opacity-0 translate-y-2 scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition-all duration-300 ease-in"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-2 scale-95"
    >
      <div className="fixed top-4 right-4 z-50">
        <div
          className={`min-w-96 max-w-md w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${
            type === "success"
              ? "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700"
              : "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {type === "success" ? (
                  <svg
                    className="h-6 w-6 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm font-medium ${
                      type === "success"
                        ? "text-green-900 dark:text-green-100"
                        : "text-red-900 dark:text-red-100"
                    }`}
                  >
                    {title}
                  </p>
                  <button
                    className={`ml-4 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      type === "success"
                        ? "text-green-500 hover:bg-green-100 dark:hover:bg-green-800 focus:ring-green-600"
                        : "text-red-500 hover:bg-red-100 dark:hover:bg-red-800 focus:ring-red-600"
                    }`}
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {message && (
                  <p
                    className={`mt-1 text-sm ${
                      type === "success"
                        ? "text-green-700 dark:text-green-200"
                        : "text-red-700 dark:text-red-200"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
            {/* Barra de progreso */}
            <div className="mt-4">
              <div
                className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 ${
                  type === "success"
                    ? "bg-green-100 dark:bg-green-800"
                    : "bg-red-100 dark:bg-red-800"
                }`}
              >
                <div
                  className={`h-1 rounded-full transition-all ease-linear ${
                    type === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Notification;
