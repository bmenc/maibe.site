// features/formBuilder/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormElement {
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
}

interface FormPage {
  page: string;
  elements: FormElement[];
}

const initialState: FormPage[] = [
  {
    page: "LoginPage",
    elements: [
      {
        name: "email",
        type: "email",
        placeholder: "Email",
        label: "Correo electrónico",
        required: true,
        validation: {
          email: true,
          minLength: 5
        },
        errorMessages: {
          required: "El correo es obligatorio",
          email: "Formato de correo inválido",
          minLength: "Mínimo 5 caracteres"
        }
      },
      {
        name: "password",
        type: "password",
        placeholder: "Contraseña",
        label: "Contraseña",
        required: true,
        validation: {
          minLength: 8
        },
        errorMessages: {
          required: "La contraseña es obligatoria",
          minLength: "Mínimo 8 caracteres"
        }
      }
    ]
  }
];

const formSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addFormPage: (state, action: PayloadAction<FormPage>) => {
      state.push(action.payload);
    },
    updateFormPage: (state, action: PayloadAction<{page: string; elements: FormElement[]}>) => {
      const index = state.findIndex(p => p.page === action.payload.page);
      if (index >= 0) {
        state[index].elements = action.payload.elements;
      }
    }
  }
});

export const { addFormPage, updateFormPage } = formSlice.actions;
export default formSlice.reducer;