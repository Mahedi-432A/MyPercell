import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();
  const onSubmit = (data) => {
    console.log(data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Create an Account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500">
                This field is required and must be at least 6 characters
              </span>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black mt-4">
              Register
            </button>
          </fieldset>
          <p><small>Already have an account? <Link className="btn btn-link" to="/login">LogIn</Link></small></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
