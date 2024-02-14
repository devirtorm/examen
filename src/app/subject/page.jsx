"use client";
import { useState, useEffect } from "react";
import {
  containsCommonSpanishWord,
  containsSequentialNumbers,
} from "@/helpers/validationHelpers";
import Input from "@/components/Input";
import words from "an-array-of-spanish-words";
import BreadCrumbAdmin from "@/components/BreadcrumbAdmin";

function subject() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    salary: "",
    email2: "",
    email: "",
    password: "",
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

  const validatePassword = (password) => {
    const passwordValidationRules = [
      {
        test: (value) => /[a-z]/.test(value),
        message: "Al menos una letra minúscula",
      },
      {
        test: (value) => /[A-Z]/.test(value),
        message: "Al menos una letra mayúscula",
      },
      { test: (value) => /[0-9]/.test(value), message: "Al menos un número" },
      {
        test: (value) => /[^a-zA-Z0-9]/.test(value),
        message: "Al menos un símbolo especial",
      },
      { test: (value) => value.length >= 10, message: "Mínimo 10 caracteres" },
    ];

    let passwordErrors = passwordValidationRules
      .filter((rule) => !rule.test(password))
      .map((rule) => rule.message);

    if (containsSequentialNumbers(password)) {
      passwordErrors.push("No números consecutivos");
    }

    if (containsCommonSpanishWord(password, words)) {
      passwordErrors.push(
        "La contraseña no debe contener palabras comunes en español"
      );
    }

    return passwordErrors;
  };

  const validateForm = () => {
    let tempErrors = {};

    // Validación para el nombre
    if (!formData.name) {
      tempErrors.name = "El nombre es obligatorio";
    } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(formData.name)) {
      tempErrors.name = "El nombre contiene caracteres inválidos";
    }

    // Validación para la edad
    if (!formData.age) {
      tempErrors.age = "La edad es obligatoria";
    } else if (
      !/^\d+$/.test(formData.age) ||
      formData.age < 1 ||
      formData.age > 100
    ) {
      tempErrors.age = "La edad debe ser un número entre 1 y 100";
    }

    // Validación para el sueldo
    if (!formData.lab) {
      tempErrors.lab = "Credito de laboratorio es obligatorio";
    } else if (
      !/^\d+(\.\d{1,2})?$/.test(formData.lab) ||
      parseFloat(formData.lab) < 0
    ) {
      tempErrors.lab =
        "El credito debe ser un número positivo con hasta dos decimales";
    }

        // Validación para el sueldo
        if (!formData.teo) {
          tempErrors.teo = "Credito de laboratorio es obligatorio";
        } else if (
          !/^\d+(\.\d{1,2})?$/.test(formData.teo) ||
          parseFloat(formData.teo) < 0
        ) {
          tempErrors.salary =
            "El credito debe ser un número positivo con hasta dos decimales";
        }


    // Validación para el correo electrónico 1
    if (!formData.email) {
      tempErrors.email = "El correo electrónico es obligatorio";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|live|yahoo)\.com$/.test(
        formData.email
      )
    ) {
      tempErrors.email = "Correo electrónico no válido";
    }

    // Validación para el correo electrónico 2
    if (!formData.email2) {
      tempErrors.email2 = "El correo electrónico es obligatorio";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@utdelacosta\.edu\.mx$/.test(formData.email2)
    ) {
      tempErrors.email2 = "Correo electrónico no válido";
    }

    // Validación para la contraseña
    if (!formData.password) {
      tempErrors.password = "La contraseña es obligatoria";
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        tempErrors.password =
          "La contraseña no cumple con: " + passwordErrors.join(", ");
      }
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
        Informe por asignatura
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white container p-10 shadow-md rounded border-4 dark:bg-gray-800 dark:border"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:grid-cols-1 lg:grid-cols-3 mb-5">
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Selecciona una opción
              </label>
              <select
                id="countries"
                //value={selectedTeacher}
                //onChange={handleTeacherChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Selecciona un departamento...</option>
                <option value="Luis Gil Pérez">Ingeniería y ciencia</option>
                <option value="Amparo Fernández Vidal">
                  Lenguaje de sistemas
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Selecciona una opción
              </label>
              <select
                id="countries"
                //value={selectedTeacher}
                //onChange={handleTeacherChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Selecciona area de conocimiento...</option>
                <option value="Luis Gil Pérez">Ingeniería y ciencia</option>
                <option value="Amparo Fernández Vidal">
                  Lenguaje de sistemas
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Profesor que imparte el curso
              </label>
              <select
                id="countries"
                //value={selectedTeacher}
                //onChange={handleTeacherChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Selecciona profesor...</option>
                <option value="Luis Gil Pérez">Luis Gil Pérez</option>
                <option value="Amparo Fernández Vidal">
                Amparo Fernández Vidal
                </option>
              </select>
            </div>
            <Input
              name="name"
              type="text"
              placeholder="Ingresa alguna titulación"
              label="Titulación"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              isSubmitted={isSubmitted}
            />
            <Input
              name="salary"
              type="text"
              placeholder="3000.23"
              label="Código"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
              isSubmitted={isSubmitted}
            />
            <Input
              name="salary"
              type="text"
              placeholder="1.0"
              label="Créditos teóricos"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
              isSubmitted={isSubmitted}
            />

            <Input
              name="lab"
              type="text"
              placeholder="1.0"
              label="Créditos de laboratorio"
              value={formData.lab}
              onChange={handleChange}
              error={errors.lab}
              isSubmitted={isSubmitted}
            />

            <Input
              name="salary"
              type="text"
              placeholder="1"
              label="Duración (en semestres)"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
              isSubmitted={isSubmitted}
            />

            <Input
              name="salary"
              type="text"
              placeholder="1"
              label="Grupos de teoría"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
              isSubmitted={isSubmitted}
            />

            <Input
              name="salary"
              type="text"
              placeholder="1"
              label="Grupos de laboratorio"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
              isSubmitted={isSubmitted}
            />


            <div>
              <label
                htmlFor="default-checkbox"
                className="font-black text-sm text-gray-700 mb-2"
              >
                Materias incompatibles
              </label>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Física
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Entornos de usuario
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="default-checkbox"
                className="font-black text-sm text-gray-700 mb-2"
              >
                Asignaturas equivalentes
              </label>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Robótica
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Algorítmica
                </label>
              </div>
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

export default subject;
