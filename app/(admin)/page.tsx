"use client";

import * as React from "react";
import { FormGroup } from "./formGroup";

export default function Home() {
  const title = "Formulario de prueba";

  return (
    <main className="p-4 flex flex-col gap-2">
      <FormGroup title={title} />
    </main>
  );
}
