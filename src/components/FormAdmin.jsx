"use client";
import { useState, useEffect } from "react";
import {
  containsCommonSpanishWord,
  containsSequentialNumbers,
} from "@/helpers/validationHelpers";
import Input from "../components/Input";
import words from "an-array-of-spanish-words";

function FormAdmin() {
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
    if (!formData.salary) {
      tempErrors.salary = "El sueldo es obligatorio";
    } else if (
      !/^\d+(\.\d{1,2})?$/.test(formData.salary) ||
      parseFloat(formData.salary) < 0
    ) {
      tempErrors.salary =
        "El sueldo debe ser un número positivo con hasta dos decimales";
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
              name="age"
              type="text"
              placeholder="Edad"
              label="Edad"
              value={formData.age}
              onChange={handleChange}
              error={errors.age}
              isSubmitted={isSubmitted}
            />
            <Input
              name="salary"
              type="text"
              placeholder="3000.23"
              label="Sueldo"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
              isSubmitted={isSubmitted}
            />
            <Input
              name="email"
              type="email"
              placeholder="example@gmail|hotmail|outlook|live|yahoo.com"
              label="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              isSubmitted={isSubmitted}
            />

            <Input
              name="email2"
              type="text"
              placeholder="example@utdelacosta.edu.mx"
              label="Correo 2"
              value={formData.email2}
              onChange={handleChange}
              error={errors.email2}
              isSubmitted={isSubmitted}
            />

            <Input
              name="password"
              type="password"
              placeholder="Example!03"
              label="Ingresa contraseña"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              isSubmitted={isSubmitted}
            />
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
    </div>
  );
}

export default FormAdmin;
