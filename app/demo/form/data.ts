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
      required: "La fecha es obligatoria"
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
  },
  {
    name: "age",
    placeholder: "Edad",
    label: "Edad",
    labelInfo: "(requerido)",
    helperText: "Ingresa tu edad en años",
    required: true,
    type: "number",
    minValue: 0, 
    errorMessages: {
      required: "La edad es obligatoria",
      minValue: "La edad no puede ser menor a 0", 
    },
    config: {
      requiredLabel: true,
    }
  },
  {
    name: "country",
    placeholder: "Selecciona un país",
    label: "País",
    helperText: "Elige tu país de residencia",
    required: true,
    type: "select",
    options: [
      { label: "México", value: "MX" },
      { label: "Estados Unidos", value: "US" },
      { label: "Canadá", value: "CA" },
    ],
    errorMessages: {
      required: "El país es obligatorio",
    },
    config: {
      requiredLabel: true,
    },
  },
  {
    name: "phone",
    placeholder: "99-99-99-99-99",
    label: "Teléfono",
    labelInfo: "(requerido)",
    helperText: "Ingresa un número de teléfono válido",
    required: true,
    type: "phone",
    errorMessages: {
      required: "El teléfono es obligatorio",
    },
    config: {
      requiredLabel: true,
    },
  },
  {
    name: "postalCode",
    placeholder: "00000",
    label: "Código Postal",
    labelInfo: "(requerido)",
    helperText: "Ingresa un código postal válido",
    required: true,
    type: "postalCode",
    errorMessages: {
      required: "El código postal es obligatorio",
    },
    config: {
      requiredLabel: true,
    },
  },
  {
    name: "comments",
    placeholder: "Escribe tus comentarios",
    label: "Comentarios",
    helperText: "Proporcione cualquier comentario adicional",
    required: true, // Cambiado de false a true
    type: "textarea",
    errorMessages: {
      required: "Los comentarios son obligatorios",
    },
    config: {
      requiredLabel: true, // Cambiado de false a true
    },
  },
  {
    name: "suggest",
    placeholder: "Busca una prueba",
    label: "Pruebas",
    helperText: "Selecciona una prueba",
    required: true,
    type: "suggest",
    options: [
      { label: "Prueba 001", value: "1" },
      { label: "Prueba 002", value: "2" },
      { label: "Prueba 003", value: "3" },
    ],
    errorMessages: {
      required: "Debes seleccionar una prueba",
    },
    config: {
      requiredLabel: true,
      openOnKeyDown: true,
      allowCreate: true,
      closeOnSelect: true,
      matchTargetWidth: true,
      minimal: true,
      resetOnClose: false,
      resetOnQuery: true,
      resetOnSelect: false,
    },
  },
  {
    name: "preferences",
    placeholder: "Elige tus preferencias",
    label: "Preferencias",
    helperText: "Selecciona una o más opciones",
    required: false,
    type: "checkbox",
    options: [
      { label: "Opción A", value: "A" },
      { label: "Opción B", value: "B" },
    ],
    config: {
      requiredLabel: false,
    },
  },
  {
    name: "gender",
    placeholder: "Selecciona tu género",
    label: "Género",
    helperText: "Selecciona uno",
    required: true,
    type: "radio",
    options: [
      { label: "Masculino", value: "male" },
      { label: "Femenino", value: "female" },
    ],
    config: {
      requiredLabel: true,
    },
  },
  {
    name: "resume",
    placeholder: "Sube tu CV",
    label: "Currículum",
    helperText: "Archivo PDF o Word",
    required: true,
    type: "file",
    config: {
      requiredLabel: true,
    },
  },
];