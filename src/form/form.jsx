import React from "react";
import "./form.css";

import { useFormik } from "formik";
import { validationSchema } from "../validations/schema";

function Form() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      password: "",
    },

    validationSchema: validationSchema,

    validateOnMount: true,

onSubmit: async (values) => {
  try {
    const response = await fetch(
      "https://shortlistr-api.searchopal.ca/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
        }),
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("API RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data.message || JSON.stringify(data) || "Registration failed"
      );
    }

    alert("Account created successfully!");

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    alert(error.message);
  }
},
  });

  return (
    <div className="form-container">
      <form
        className="simple-form"
        onSubmit={formik.handleSubmit}
      >
        <h2>Create Account</h2>
        <p>Fill these details</p>

                                            {/* NAME */}
        <div className="form-group">
          <label>Your Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.name && formik.errors.name && (
            <p className="error">
              {formik.errors.name}
            </p>
          )}
        </div>

                                               {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.email && formik.errors.email && (
            <p className="error">
              {formik.errors.email}
            </p>
          )}
        </div>

                                                {/* PHONE */}
        <div className="form-group">
          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.phone && formik.errors.phone && (
            <p className="error">
              {formik.errors.phone}
            </p>
          )}
        </div>

                                                  {/* COMPANY */}
        <div className="form-group">
          <label>Company Name</label>

          <input
            type="text"
            name="company"
            placeholder="Enter your company name"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.company && formik.errors.company && (
            <p className="error">
              {formik.errors.company}
            </p>
          )}
        </div>

                                        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.password && formik.errors.password && (
            <p className="error">
              {formik.errors.password}
            </p>
          )}
        </div>

                                                      {/* BUTTON */}
        <button
          type="submit"
          disabled={!formik.isValid}
        >
          Create Account →
        </button>
      </form>
    </div>
  );
}

export default Form;