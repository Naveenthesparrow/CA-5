import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../App.css";

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const [isSubmitted, setSubmitted] = useState(false);

  const watchPassword = watch("password", ""); // Watch the password field

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    window.alert("Form submitted successfully!");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
              minLength: 3,
              maxLength: 30,
            }}
            render={({ field }) => <input {...field} />}
          />
          {errors.name && errors.name.type === "required" && (
            <span>Name is required</span>
          )}
          {errors.name && errors.name.type === "minLength" && (
            <span>Name should be at least 3 characters</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span>Name should not exceed 30 characters</span>
          )}
        </div>
        <div>
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            }}
            render={({ field }) => (
              <div>
                <input {...field} />
                {errors.email && errors.email.type === "required" && (
                  <span>Email is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span>Invalid email</span>
                )}
              </div>
            )}
          />
        </div>
        <div>
          <label>Password:</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: 10,
              validate: (value) =>
                value && /[!@#$%^&*(),.?":{}|<>]/.test(value), // At least one special character
            }}
            render={({ field }) => (
              <div>
                <input type="password" {...field} />
                {errors.password && errors.password.type === "required" && (
                  <span>Password is required</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span>Password must be at least 10 characters</span>
                )}
                {errors.password && errors.password.type === "validate" && (
                  <span>
                    Password must contain at least one special character
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <div>
          <label>Repeat Password:</label>
          <Controller
            name="repeatPassword"
            control={control}
            rules={{
              required: true,
              validate: (value) => value === watchPassword,
            }}
            render={({ field }) => (
              <div>
                <input type="password" {...field} />
                {errors.repeatPassword &&
                  errors.repeatPassword.type === "required" && (
                    <span>Repeat Password is required</span>
                  )}
                {errors.repeatPassword &&
                  errors.repeatPassword.type === "validate" && (
                    <span>Passwords do not match</span>
                  )}
              </div>
            )}
          />
        </div>
        <button type="submit" disabled={!isValid}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Form;
