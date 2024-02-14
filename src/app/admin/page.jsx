"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import BreadCrumbAdmin from "@/components/BreadcrumbAdmin";

function admin() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    salary: "",
    despacho: "",
    email: "",
    password: "",
    time: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [checkboxValues, setCheckboxValues] = useState({
    programmingLanguages: false,
    userInterfaces: false, // Valor predeterminado
  });

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

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    setError(false); // Reiniciar el estado de error cuando se selecciona una opción
  };

  // Función para manejar el cambio en los checkboxes
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxValues({
      ...checkboxValues,
      [id]: checked,
    });
    setError(false); // Reiniciar el estado de error cuando se cambia el checkbox
  };

  const validateForm = () => {
    let tempErrors = {};

    // Validación para el nombre
    if (!formData.name) {
      tempErrors.name = "El nombre es obligatorio";
    } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(formData.name)) {
      tempErrors.name = "El nombre contiene caracteres inválidos";
    }

    // Validación para time
    if (!formData.name) {
      tempErrors.name = "Hora de consulta obligatoria";
    } else if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(formData.name)) {
      tempErrors.name = "El nombre contiene caracteres inválidos";
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
    // Realiza cualquier validación necesaria antes de enviar el formulario
    if (
      !checkboxValues.programmingLanguages &&
      !checkboxValues.userInterfaces
    ) {
      // Mostrar el error si no se ha seleccionado ningún checkbox
      setError(true);
      return; // Salir de la función si hay un error
    }

    // Realiza cualquier validación necesaria antes de enviar el formulario
    if (!selectedOption) {
      // Mostrar el error si no se ha seleccionado ninguna opción
      setError(true);
      return; // Salir de la función si hay un error
    }

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

            <div
              className={
                Error && !selectedOption ? "bg-red-100 p-4 rounded" : ""
              }
            >
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Selecciona una opción
              </label>
              <select
                id="countries"
                value={selectedOption}
                onChange={handleSelectChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Selecciona un departamento...</option>
                <option value="Luis Gil Pérez">Ingeniería y ciencia</option>
                <option value="Amparo Fernández Vidal">
                  Lenguaje de sistemas
                </option>
              </select>
              {Error && !selectedOption && (
                <p className="text-red-600 text-sm mt-2">
                  Debe seleccionar una opción
                </p>
              )}
            </div>
            <div
              className={
                Error &&
                !checkboxValues.programmingLanguages &&
                !checkboxValues.userInterfaces
                  ? "bg-red-100 p-4 rounded"
                  : ""
              }
            >
              <label
                htmlFor="programmingLanguages"
                className="font-black text-sm text-gray-700 mb-2"
              >
                Lenguajes de programación
              </label>
              <div className="flex items-center mb-4">
                <input
                  id="programmingLanguages"
                  type="checkbox"
                  checked={checkboxValues.programmingLanguages}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="programmingLanguages"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lenguajes de programación
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="userInterfaces"
                  type="checkbox"
                  checked={checkboxValues.userInterfaces}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="userInterfaces"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Entornos de usuario
                </label>
              </div>
              {Error &&
                !checkboxValues.programmingLanguages &&
                !checkboxValues.userInterfaces && (
                  <p className="text-red-600 text-sm mt-2">
                    Debe seleccionar al menos una opción
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

export default admin;
