"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  containsCommonSpanishWord,
  containsSequentialNumbers,
} from "@/helpers/validationHelpers";
import Input from "../components/Input";
import words from "an-array-of-spanish-words";

function Form() {
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
          <div className="grid grid-cols-1 md:grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-1 mb-5">

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
            className="text-white mr-4 bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center"
          >
            Validar
          </button>
          <Link
            href={'/subject'}
            className="text-white mr-4 bg-red-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center"
          >
            Informe por asignatura 
          </Link>
          <Link
            href={'/admin'}
            className="text-white  bg-gray-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center"
          >
            Informe por profesor
          </Link>
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

export default Form;
