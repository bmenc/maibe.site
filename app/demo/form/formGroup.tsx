"use client";

import * as React from "react";
import { H4, Button, Divider } from "@blueprintjs/core";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomField } from "@/app/demo/form/customField";
import { formFields } from "./data";

const generateSchema = () => {
  const schema: Record<string, z.ZodTypeAny> = {};
  
  formFields.forEach((field) => {
    let fieldSchema = z.string();
    
    if (field.required) {
      fieldSchema = fieldSchema.min(1, field.errorMessages?.required || "Este campo es requerido");
    }
    
    if (field.minLength) {
      fieldSchema = fieldSchema.min(
        field.minLength,
        field.errorMessages?.minLength || `Mínimo ${field.minLength} caracteres`
      );
    }
    
    if (field.email) {
      fieldSchema = fieldSchema.email(
        field.errorMessages?.email || "Debe ser un correo válido"
      );
    }

    if (field.type === "number") {
      const numberSchema = z.preprocess(
        (value) => (typeof value === "string" ? parseFloat(value) : value),
        z.number().min(
          field.minValue ?? 0,
          field.errorMessages?.minValue || `El valor mínimo es ${field.minValue ?? 0}`
        )
      );
      schema[field.name] = numberSchema;
    } else {
      schema[field.name] = fieldSchema;
    }
  });
  
  return z.object(schema);
};

export function FormGroup({ title }: { title: string }) {
  const formSchema = generateSchema();
  type FormData = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formFields.reduce(
      (acc, field) => ({ ...acc, [field.name]: "" }),
      {} as FormData
    ),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <>
      <H4>{title}</H4>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-wrap gap-4">
          {formFields.map((field) => (
            <Controller
              key={field.name}
              name={field.name as keyof FormData}
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CustomField
                  name={field.name}
                  placeholder={field.placeholder}
                  label={field.label}
                  labelInfo={field.labelInfo}
                  helperText={field.helperText}
                  subLabel={field.subLabel}
                  value={value}
                  onStateChange={({ value }) => onChange(value)}
                  error={errors[field.name]?.message as string}
                  inputRef={ref}
                  config={field.config}
                  type={field.type}
                  options={field.options} // Pasamos las opciones al componente
                  onClear={() => onChange("")} // Manejamos el botón de limpiar
                  type={field.type} // Aseguramos que el tipo de campo se pase correctamente
                />
              )}
            />
          ))}
        </div>
        <div className="flex">
          <Button type="submit" text="Guardar" />
        </div>
      </form>
      <Divider/>
    </>
  );
}