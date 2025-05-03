// components/FormGenerator.tsx
import React from "react";
import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormGeneratorProps {
  elements: Array<{
    name: string;
    type: "text" | "email" | "password" | "number";
    placeholder?: string;
    label?: string;
    labelInfo?: string;
    helperText?: string;
    required?: boolean;
    validation?: {
      minLength?: number;
      maxLength?: number;
      pattern?: string;
      email?: boolean;
    };
    errorMessages?: Record<string, string>;
    config?: {
      disabled?: boolean;
      requiredLabel?: boolean;
    };
  }>;
  onSubmit: (values: Record<string, string>) => void;
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({ elements, onSubmit }) => {

    const generateValidationSchema = () => {
    const shape: Record<string, Yup.AnySchema> = {};
    
    elements.forEach(element => {
      let validator;
      
      if (element.type === "email") {
        validator = Yup.string().email(element.errorMessages?.email || "Email inválido");
      } else {
        validator = Yup.string();
      }

      if (element.required) {
        validator = validator.required(element.errorMessages?.required || "Campo requerido");
      }

      if (element.validation?.minLength) {
        validator = validator.min(
          element.validation.minLength,
          element.errorMessages?.minLength || `Mínimo ${element.validation.minLength} caracteres`
        );
      }

      if (element.validation?.maxLength) {
        validator = validator.max(
          element.validation.maxLength,
          element.errorMessages?.maxLength || `Máximo ${element.validation.maxLength} caracteres`
        );
      }

      shape[element.name] = validator;
    });

    return Yup.object().shape(shape);
  };

  const validationSchema = generateValidationSchema();

  const formik = useFormik({
    initialValues: elements.reduce((acc, element) => {
      acc[element.name] = "";
      return acc;
    }, {} as Record<string, string>),
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {elements.map((element) => {
        const error = formik.touched[element.name] && formik.errors[element.name];
        const intent = error ? Intent.DANGER : Intent.NONE;

        return (
          <FormGroup
            key={element.name}
            label={element.label}
            labelFor={element.name}
            labelInfo={element.config?.requiredLabel ? "(requerido)" : undefined}
            helperText={error || element.helperText}
            intent={intent}
            style={{ marginBottom: "1rem" }}
          >
            <InputGroup
              id={element.name}
              name={element.name}
              placeholder={element.placeholder}
              type={element.type}
              value={formik.values[element.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={element.config?.disabled}
              intent={intent}
              style={{ width: "100%", maxWidth: "200px" }}
            />
          </FormGroup>
        );
      })}
      <button 
        type="submit" 
        className="bp3-button bp3-intent-primary"
        disabled={!formik.isValid || formik.isSubmitting}
      >
        Enviar
      </button>
    </form>
  );
};