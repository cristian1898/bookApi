import { checkSchema } from "express-validator";
export const authorIdSchema = checkSchema({
  id: {
    in: ["params"],
    isString: {
      errorMessage: "El ID debe ser una cadena de texto.",
    },
    isLength: {
      options: { min: 20, max: 28 }, // Ajusta estos valores según el formato de los IDs de Firebase
      errorMessage: "El ID debe tener una longitud válida.",
    },
  },
});

export const authorSchema = checkSchema({
  name: {
    in: ["body"],
    isString: {
      errorMessage: "El nombre debe ser una cadena de texto.",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "El correo electrónico debe ser válido.",
    },
  },
  img: {
    in: ["body"],
    isURL: {
      errorMessage: "La URL de la imagen no es válida.",
    },
  },
  biographyInformation: {
    in: ["body"],
    isString: {
      errorMessage: "La información biográfica debe ser una cadena de texto.",
    },
  },
  firstName: {
    in: ["body"],
    isString: {
      errorMessage: "El primer nombre debe ser una cadena de texto.",
    },
  },
  lastName: {
    in: ["body"],
    isString: {
      errorMessage: "El apellido debe ser una cadena de texto.",
    },
  },
});
