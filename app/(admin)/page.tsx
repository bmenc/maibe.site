"use client";

import * as React from "react";
import { FormGroupCustom } from "@/app/components/formGroupCustom";
import { formFields } from "./data";

export default function Home() {
  return (
    <main className="w-full p-4 flex flex-wrap gap-4">
      {formFields.map((field) => (
        <FormGroupCustom
          key={field.name}
          name={field.name}
          placeholder={field.placeholder}
          config={field.config}
          label={field.label}
          labelInfo={field.labelInfo}
          helperText={field.helperText}
          subLabel={field.subLabel}
          initialState={{
            disabled: false,
            fill: false,
            ...field.config,
          }}
          onStateChange={(state) => console.log(`Campo: ${field.name}`, state)}
        />
      ))}
    </main>
  );
}
