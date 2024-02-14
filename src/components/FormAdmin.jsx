"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import BreadCrumbAdmin from "@/components/BreadcrumbAdmin";

function FormAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    salary: "",
    despacho: "",
    email: "",
    password: "",
    time: "",
    opcion1: "",
    check1: false,
    check2: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  //efecto que hace que la alerta se mantenga por 5 segundos
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);

      const timer = setTimeout(() => {
        setShowErrors(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);


  const validateForm = () => {
    let tempErrors = {};

    if (!formData.check1 && !formData.check2) {
      tempErrors.checks = "Selecciona al menos una opción";
    }

    if (!formData.opcion1) {
      tempErrors.opcion1 = "Campo obligatorio";
    }

    // Validación para el nombre
    if (!formData.name) {
      tempErrors.name = "El nombre es obligatorio";
    } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(formData.name)) {
      tempErrors.name = "El nombre contiene caracteres inválidos";
    }

    // Validación para time
    if (!formData.time) {
      tempErrors.time = "Hora de consulta obligatoria";
    } else if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(formData.time)) {
      tempErrors.time = "El nombre contiene caracteres inválidos";
    }

    // Validación para despacho
    if (!formData.time) {
      tempErrors.despacho = "El numero de despacho es obligatorio";
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(formData.despacho)
    ) {
      tempErrors.despacho = "Ingresa un codigo de despacho valido";
    }

    //se establecen los errores en el estado de errores
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0; // si no
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
    if (validateForm()) {
      formData;
    }
  };

  return (
    <div className="container my-auto mx-auto p-4">
      <h1 className="text-3xl text-center m-20 font-black">
        Informe por profesor
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white container p-10 shadow-md rounded border-4 dark:bg-gray-800 dark:border"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:grid-cols-1 lg:grid-cols-3 mb-5">
            <Input
              name="name"
              type="text"
              placeholder="John Doe"
              label="Nombre"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              isSubmitted={isSubmitted}
            />
            <Input
              name="despacho"
              type="text"
              placeholder="Ingresa el numero de despacho"
              label="Despacho"
              value={formData.despacho}
              onChange={handleChange}
              error={errors.despacho}
              isSubmitted={isSubmitted}
            />
            <Input
              name="time"
              type="datetime-local"
              placeholder="Ingresa el numero de despacho"
              label="Despacho"
              value={formData.time}
              onChange={handleChange}
              error={errors.time}
              isSubmitted={isSubmitted}
            />

<div>
              <label
                htmlFor="countries"
                className={`block mb-2 text-sm font-black ${
                  isSubmitted
                    ? errors.opcion1
                      ? "text-red-700"
                      : "text-green-800"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                Selecciona una opción
              </label>
              <select
                id="opcion1"
                name="opcion1"
                value={formData.opcion1}
                onChange={handleChange}
                className={`text-xs rounded block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border font-semibold border-gray-300 focus:ring-indigo-500 ${
                  isSubmitted
                    ? errors.opcion1
                      ? "text-red-700 border-red-700"
                      : "text-green-800 border-green-700"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                <option value="">Selecciona un departamento...</option>
                <option value="Luis Gil Pérez">Ingeniería y ciencia</option>
                <option value="Amparo Fernández Vidal">
                  Lenguaje de sistemas
                </option>
              </select>
              {isSubmitted && (
                <p
                  className={`mt-2 font-bold text-xs ${
                    isSubmitted
                      ? errors.opcion1
                        ? "text-red-700"
                        : "text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  {errors.opcion1
                    ? errors.opcion1
                    : "Campo completado correctamente"}
                </p>
              )}
            </div>


            <div>
              <label
                htmlFor="default-checkbox"
                className={`block mb-2 text-sm font-black ${
                  isSubmitted
                    ? errors.checks
                      ? "text-red-700"
                      : "text-green-800"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                Lenguajes de programación
              </label>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  name="check1"
                  onChange={handleChange}
                  value={formData.check1}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className={`ms-2 text-sm font-medium dark:text-gray-300 ${
                    isSubmitted
                      ? errors.checks
                        ? "text-red-700"
                        : "text-green-700"
                      : ""
                  }`}
                >
                  Lenguajes de programación
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  onChange={handleChange}
                  value={formData.check2}
                  name="check2"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className={`ms-2 text-sm font-medium dark:text-gray-300 ${
                    isSubmitted
                      ? errors.checks
                        ? "text-red-700"
                        : "text-green-700"
                      : ""
                  }`}
                >
                  Entornos de usuario
                </label>
              </div>
              {isSubmitted && (
                <p
                  className={`mt-2 font-bold text-xs ${
                    isSubmitted
                      ? errors.checks
                        ? "text-red-700"
                        : "text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  {errors.checks
                    ? errors.checks
                    : "Campo completado correctamente"}
                </p>
              )}
            </div>


          </div>

          <button
            type="submit"
            className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center"
          >
            Guardar datos
          </button>
        </form>
        {showErrors && Object.keys(errors).length > 0 && (
          <div className="mt-10 p-10 bg-red-400 border-red-700 border-2 rounded-md">
            <h3 className="text-white mb-2 font-bold">Lista de errores</h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key} className="text-white text-xs">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <BreadCrumbAdmin />
    </div>
  );
}

export default FormAdmin;
