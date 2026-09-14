import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "  Name must be at least 3 characters ")
     .required("Name is required"),

  email: Yup.string()
     .email("Enter a valid email address")
     .required("Emails is required"),

  phone: Yup.string()
       .matches(/^[0-9]{10,15}$/, "Enter a valid phone num")
    .required("Phone  number is required bro"),
 
  company: Yup.string()
    .min(2, "Company name is too short")
    .required("Company name is required bro"),
  
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});