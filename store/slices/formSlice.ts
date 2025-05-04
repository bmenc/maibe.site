import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  email?: boolean;
  matchWith?: string;
}

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
    matchWith?: string;
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
        label: "Email",
        required: true,
        validation: {
          email: true,
          minLength: 5
        },
        errorMessages: {
          required: "Email is required",
          email: "Invalid email format",
          minLength: "Minimum 5 characters"
        }
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        label: "Password",
        required: true,
        validation: {
          minLength: 8
        },
        errorMessages: {
          required: "Password is required",
          minLength: "Minimum 8 characters"
        }
      }
    ]
  },
  {
    page: "RegisterPage",
    elements: [
      {
        name: "email",
        type: "email",
        placeholder: "example@email.com",
        label: "Email",
        required: true,
        validation: {
          email: true,
          minLength: 5
        },
        errorMessages: {
          required: "Email is required",
          email: "Invalid email format",
          minLength: "Minimum 5 characters"
        }
      },
      {
        name: "password",
        type: "password",
        placeholder: "Create a password",
        label: "Password",
        required: true,
        validation: {
          minLength: 8,
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
        },
        errorMessages: {
          required: "Password is required",
          minLength: "Minimum 8 characters",
          pattern: "Must contain uppercase, lowercase, and numbers"
        }
      },
      {
        name: "confirmPassword",
        type: "password",
        placeholder: "Repeat your password",
        label: "Confirm Password",
        required: true,
        validation: {
          matchWith: "password"
        },
        errorMessages: {
          required: "You must confirm your password",
          matchWith: "Passwords do not match"
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