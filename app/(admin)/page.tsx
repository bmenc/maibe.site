"use client";
import { FormGroupExample } from "@/app/components/examples/formGroupExample";
import { FieldType } from "@/app/components/examples/formGroupExample";

export default function Home() {

  return (
    <main className="w-full p-2">
      <FormGroupExample id="" p_type={FieldType.TEXT} p_label="Nombre" p_disabled={false} />
    </main>
  );
}
