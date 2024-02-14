"use client"
import FormSubject from "@/components/FormSubject"
import { useState, useEffect } from 'react';

function subject() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simula una carga de 3 segundos
  
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }
  
  return (
    <FormSubject/>
  )
}

export default subject