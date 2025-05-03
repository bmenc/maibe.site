"use client";

import { useSelector } from "react-redux";
import { FormGenerator } from "@/components/FormGenerator";
import { RootState } from "@/store/redux/store";

export default function LoginPage() {
  const loginForm = useSelector((state: RootState) => 
    state.formBuilder.find(page => page.page === "LoginPage")
  );

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Form submitted:", values);
  };

  if (!loginForm) return <div>Formulario no configurado</div>;

  return (
    <section className="p-4">
        <FormGenerator 
          elements={loginForm.elements} 
          onSubmit={handleSubmit} 
        />
    </section>
  );
}