"use client";

import * as React from "react";
import { FormGroup } from "./formGroup";
import { formFields } from "./data";
import PrevisualizerJSON from "@/app/demo/form/PrevisualizerJSON";
import SimplePhoneInput from "./InputMask"

export default function FormPage() {
  const title = "Formulario de prueba";
  const [data] = React.useState(formFields);

  return (
    <main className="p-4 flex flex-col gap-2">
      <FormGroup title={title} />
      <PrevisualizerJSON data={data} />
      <SimplePhoneInput />
    </main>
  );
}
