import Image from "next/image";
import Form from "@/components/Form";
import BreadCrumb from "@/components/BreadCrumb";
import PersistentButton from "@/components/PersistentButton"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-10 flex-1">
        <p className="text-center font-black text-indigo-600 mb-10 text-2xl dark:text-white">
          Inicio de
          <span className="text-blue-600"> sesión</span>
        </p>
        <PersistentButton/>
        <Form />
      </div>
      <BreadCrumb/>
    </div>
  );
}
