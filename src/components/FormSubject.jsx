"use client";
import { useState, useEffect } from "react";
import {
  containsCommonSpanishWord,
  containsSequentialNumbers,
} from "@/helpers/validationHelpers";
import Input from "@/components/Input";
import words from "an-array-of-spanish-words";
import BreadCrumbAdmin from "@/components/BreadcrumbAdmin";

function FormSubject() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    labGroup: "",
    email2: "",
    email: "",
    password: "",
    opcion1: "",
    opcion2: "",
    opcion3: "",
    check1: false,
    check2: false,
    checkIncompatible1: false,
    checkIncompatible2: false,
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

    //validar checkbox
    if (!formData.check1 && !formData.check2) {
      tempErrors.checks = "Selecciona al menos una opción";
    }

        //validar checkbox
        if (!formData.checkIncompatible2 && !formData.checkIncompatible1) {
          tempErrors.checkIncompatible = "Selecciona al menos una opción";
        }

    // Validación para la opcion1
    if (!formData.opcion1) {
      tempErrors.opcion1 = "Campo obligatorio";
    }

    if (!formData.opcion2) {
      tempErrors.opcion2 = "Campo obligatorio";
    }

    if (!formData.opcion3) {
      tempErrors.opcion3 = "Campo obligatorio";
    }

    if (!formData.titulacion) {
      tempErrors.titulacion = "La titulación es obligatorio";
    } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(formData.titulacion)) {
      tempErrors.titulacion =
        "Se encuentran caracteres no permitidos en titulación";
    }

    if (!formData.codigo) {
      tempErrors.codigo = "El código es obligatorio";
    } else if (!/^[a-zA-Z0-9]{3}$/.test(formData.codigo)) {
      tempErrors.codigo =
        "El código ingresado tiene caracteres no permitidos solo se admiten 3 caracteres y ningún símbolo";
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
      tempErrors.lab = "Crédito de laboratorio es obligatorio";
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
      tempErrors.teo =
        "El credito debe ser un número positivo con hasta dos decimales";
    }

    if (!formData.duracion) {
      tempErrors.duracion = "Introduce la duración";
    } else if (
      !/^[1-9]$/.test(formData.duracion) ||
      parseFloat(formData.duracion) < 0
    ) {
      tempErrors.duracion =
        "La duración es muy larga o muy corta máximo 9 semestres y mínimo 1";
    }

    if (!formData.labGroup) {
      tempErrors.labGroup = "Introduce la cantidad de grupos de laboratorio";
    } else if (
      !/^[1-5]$/.test(formData.labGroup) ||
      parseFloat(formData.labGroup) < 0
    ) {
      tempErrors.labGroup = "No se admiten demasiados grupos, mínimo 5";
    }

    if (!formData.teoGroup) {
      tempErrors.teoGroup = "Introduce la cantidad de grupos de teoría";
    } else if (
      !/^[1-5]$/.test(formData.teoGroup) ||
      parseFloat(formData.teoGroup) < 0
    ) {
      tempErrors.teoGroup = "No se admiten demasiados grupos, mínimo 5";
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
    console.log(formData.opcion1);
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
                htmlFor="countries"
                className={`block mb-2 text-sm font-black ${
                  isSubmitted
                    ? errors.opcion2
                      ? "text-red-700"
                      : "text-green-800"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                Selecciona una opción
              </label>
              <select
                name="opcion2"
                value={formData.opcion2}
                onChange={handleChange}
                className={`text-xs rounded block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border font-semibold border-gray-300 focus:ring-indigo-500 ${
                  isSubmitted
                    ? errors.opcion2
                      ? "text-red-700 border-red-700"
                      : "text-green-800 border-green-700"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                <option value="">Selecciona area de conocimiento...</option>
                <option value="Luis Gil Pérez">Ingeniería y ciencia</option>
                <option value="Amparo Fernández Vidal">
                  Lenguaje de sistemas
                </option>
              </select>
              {isSubmitted && (
                <p
                  className={`mt-2 font-bold text-xs ${
                    isSubmitted
                      ? errors.opcion2
                        ? "text-red-700"
                        : "text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  {errors.opcion2
                    ? errors.opcion2
                    : "Campo completado correctamente"}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="countries"
                className={`block mb-2 text-sm font-black ${
                  isSubmitted
                    ? errors.opcion3
                      ? "text-red-700"
                      : "text-green-800"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                Profesor que imparte el curso
              </label>
              <select
                name="opcion3"
                value={formData.opcion3}
                onChange={handleChange}
                className={`text-xs rounded block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border font-semibold border-gray-300 focus:ring-indigo-500 ${
                  isSubmitted
                    ? errors.opcion3
                      ? "text-red-700 border-red-700"
                      : "text-green-800 border-green-700"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                <option value="">Seleccionar profesor...</option>
                <option value="Luis Gil Pérez">Luis Gil Pérez</option>
                <option value="Amparo Fernández Vidal">
                  Amparo Fernández Vidal
                </option>
              </select>
              {isSubmitted && (
                <p
                  className={`mt-2 font-bold text-xs ${
                    isSubmitted
                      ? errors.opcion3
                        ? "text-red-700"
                        : "text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  {errors.opcion3
                    ? errors.opcion3
                    : "Campo completado correctamente"}
                </p>
              )}
            </div>
            <Input
              name="titulacion"
              type="text"
              placeholder="Ingresa alguna titulación"
              label="Titulación"
              value={formData.titulacion}
              onChange={handleChange}
              error={errors.titulacion}
              isSubmitted={isSubmitted}
            />
            <Input
              name="codigo"
              type="text"
              placeholder="3000.23"
              label="Código"
              value={formData.codigo}
              onChange={handleChange}
              error={errors.codigo}
              isSubmitted={isSubmitted}
            />
            <Input
              name="teo"
              type="text"
              placeholder="1.0"
              label="Créditos teóricos"
              value={formData.teo}
              onChange={handleChange}
              error={errors.teo}
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
              name="duracion"
              type="number"
              placeholder="1"
              label="Duración (en semestres)"
              value={formData.duracion}
              onChange={handleChange}
              error={errors.duracion}
              isSubmitted={isSubmitted}
            />

            <Input
              name="teoGroup"
              type="text"
              placeholder="1"
              label="Grupos de teoría"
              value={formData.teoGroup}
              onChange={handleChange}
              error={errors.teoGroup}
              isSubmitted={isSubmitted}
            />

            <Input
              name="labGroup"
              type="text"
              placeholder="1"
              label="Grupos de laboratorio"
              value={formData.labGroup}
              onChange={handleChange}
              error={errors.labGroup}
              isSubmitted={isSubmitted}
            />

            <div>
              <label
                htmlFor="default-checkbox"
                className={`block mb-2 text-sm font-black ${
                  isSubmitted
                    ? errors.checkIncompatible
                      ? "text-red-700"
                      : "text-green-800"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                Materias incompatibles
              </label>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  name="checkIncompatible2"
                  onChange={handleChange}
                  value={formData.checkIncompatible1}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className={`ms-2 text-sm font-medium dark:text-gray-300 ${
                    isSubmitted
                      ? errors.checkIncompatible
                        ? "text-red-700"
                        : "text-green-700"
                      : ""
                  }`}
                >
                  Física
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  onChange={handleChange}
                  value={formData.checkIncompatible2}
                  name="checkIncompatible1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className={`ms-2 text-sm font-medium dark:text-gray-300 ${
                    isSubmitted
                      ? errors.checkIncompatible
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
                      ? errors.checkIncompatible
                        ? "text-red-700"
                        : "text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  {errors.checkIncompatible
                    ? errors.checkIncompatible
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
                Asignaturas equivalentes
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
                  Robótica
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
                  Algorítmica
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

export default FormSubject;
