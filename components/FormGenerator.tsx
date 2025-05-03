import React from "react";
import { FormGroup, InputGroup, Intent, Button } from "@blueprintjs/core";
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
      matchWith?: string;
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

      if (element.validation?.pattern) {
        validator = validator.matches(
          new RegExp(element.validation.pattern),
          element.errorMessages?.pattern || "Formato inválido"
        );
      }

      if (element.validation?.matchWith) {
        validator = validator.oneOf(
          [Yup.ref(element.validation.matchWith), undefined],
          element.errorMessages?.matchWith || "Los valores no coinciden"
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
    <form onSubmit={formik.handleSubmit} autoComplete="nope">
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
              autoComplete="new-password"
            />
          </FormGroup>
        );
      })}
      <Button type="submit" intent={Intent.NONE} disabled={!formik.isValid || formik.isSubmitting}>
        Send
      </Button>
    </form>
  );
};