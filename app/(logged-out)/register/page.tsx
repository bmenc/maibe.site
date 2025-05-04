"use client";

import { useSelector } from "react-redux";
import { FormGenerator } from "@/components/FormGenerator";
import { RootState } from "@/store/store";
import { registerUser } from "@/server/auth";

export default function RegisterPage() {
  const registerForm = useSelector((state: RootState) => 
    state.formBuilder.find(page => page.page === "RegisterPage")
  );

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      const { email, password } = values;
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const response = await registerUser({ email, password });
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
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