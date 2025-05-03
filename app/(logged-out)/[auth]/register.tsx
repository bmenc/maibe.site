"use client";
import { useSelector } from "react-redux";
import { FormGenerator } from "@/components/FormGenerator";
import { RootState } from "@/store/store";

export default function RegisterPage() {
  const registerForm = useSelector((state: RootState) => 
    state.formBuilder.find(page => page.page === "RegisterPage")
  );

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Registro enviado:", {
      email: values.email,
      password: values.password
    });
  };

  if (!registerForm) return <div>Formulario no configurado</div>;

  return (
    <section className="p-4">
        <FormGenerator 
          elements={registerForm.elements} 
          onSubmit={handleSubmit} 
        />
    </section>
  );
}