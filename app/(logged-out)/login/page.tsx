"use client";

import { useSelector } from "react-redux";
import { FormGenerator } from "@/components/FormGenerator";
import { RootState } from "@/store/store";
import { fetchUserByIdOrEmail } from "@/server/auth";

export default function LoginPage() {
  const loginForm = useSelector((state: RootState) => 
    state.formBuilder.find(page => page.page === "LoginPage")
  );

  const handleSubmit = async (values: Record<string, string>) => {
    console.log("Form submitted:", values);

    try {
      const userData = await fetchUserByIdOrEmail("example@example.com");
      console.log("User data:", userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
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