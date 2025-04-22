export const formFields = [
  {
    name: "firstName",
    placeholder: "Nombre",
    label: "Nombre",
    labelInfo: "(requerido)",
    helperText: "Escribe tu nombre completo",
    subLabel: "Este campo no puede quedar vacío",
    required: true,
    minLength: 1,
    email: false,
    errorMessages: {
      required: "El nombre es obligatorio",
      minLength: "El nombre no puede estar vacío"
    },
    config: {
      requiredLabel: true,
    }
  },
  {
    name: "lastName",
    placeholder: "Apellido",
    label: "Apellido",
    helperText: "Escribe tu apellido",
    required: false,
    minLength: 0,
    errorMessages: {
      // required: "El apellido es obligatorio",
      // minLength: "El apellido no puede estar vacío"
    },
    config: {
      requiredLabel: false
    }
  },
  {
    name: "email",
    placeholder: "Correo electrónico",
    label: "Correo",
    labelInfo: "(obligatorio)",
    helperText: "Debes ingresar un correo válido",
    subLabel: "Usaremos este correo para contactarte",
    required: true,
    email: true,
    errorMessages: {
      required: "El correo es obligatorio",
      email: "Debe ser un correo válido"
    },
    config: {
      requiredLabel: true
    }
  },
  {
    name: "dateOfBirth",
    placeholder: "Fecha de nacimiento",
    label: "Fecha de Nacimiento",
    helperText: "Selecciona tu fecha de nacimiento",
    required: true,
    type: "date",
    errorMessages: {
      required: "La fecha de nacimiento es obligatoria"
    },
    config: {
      requiredLabel: true
    }
  },
  {
    name: "time",
    placeholder: "Hora",
    label: "Hora",
    helperText: "Selecciona una hora válida",
    required: true,
    type: "time",
    errorMessages: {
      required: "La hora es obligatoria"
    },
    config: {
      requiredLabel: true
    }
  }
];