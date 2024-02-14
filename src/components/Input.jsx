function Input({ name, label, error, type, value, onChange, isSubmitted, placeholder }) {
    // clases que se mantienen igual
    const baseInputClass = "text-xs rounded block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  
    //clases que dependen de si hay error o no y si el formulario ha sido enviado
    const inputClass = isSubmitted
      ? (error
          ? "border font-semibold border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
          : "border font-semibold border-green-600 text-green-900 focus:ring-green-900 focus:border-green-900")
      : "border font-semibold border-gray-300 focus:ring-indigo-500 focus:border-indigo-500";
  
    const messageClass = `mt-2 font-bold text-xs ${isSubmitted ? (error ? 'text-red-700' : 'text-green-700') : 'text-gray-700'}`;
  
    return (
      <div className="mb-5">
        <label
          htmlFor={name}
          className={`block mb-2 text-sm font-black ${isSubmitted ? (error ? 'text-red-700' : 'text-green-800') : 'text-gray-700 dark:text-gray-100'}`}
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className={`${baseInputClass} ${inputClass}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {isSubmitted && (
          <p className={messageClass}>
            {error ? error : 'Campo completado correctamente'}
          </p>
        )}
      </div>
    );
  }
  
  export default Input;
  