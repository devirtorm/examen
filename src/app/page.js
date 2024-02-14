"use client"
import { useEffect, useState } from 'react';
import Form from "@/components/Form";
import BreadCrumb from "@/components/BreadCrumb";
import PersistentButton from "@/components/PersistentButton"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        const newProgress = oldProgress + 10;
        return newProgress;
      });
    }, 100); // Actualiza el progreso cada 300ms

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500">
          </div>
        </div>
      </div>

    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-10 flex-1">
        <p className="text-center font-black text-indigo-600 mb-10 text-2xl dark:text-white">
          Inicio de
          <span className="text-blue-600"> sesión</span>
        </p>
        <PersistentButton />
        <Form />
      </div>
      <BreadCrumb />
    </div>
  );
}
