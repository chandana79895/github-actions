import * as Yup from "yup";

// Note: the error message is a key from the translations
export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .max(50, "usernameMaxLength")
    .matches(/^\S*$/, "usernameNoSpace"),
  password: Yup.string().min(8, "passwordMinLength"),
});
