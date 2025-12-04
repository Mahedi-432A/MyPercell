import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Please LogIn</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />

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
          <button className="btn btn-primary text-black mt-4">Login</button>
          </fieldset>
          <p><small>Don't have an account? <Link className="btn btn-link" to="/register">Register</Link></small></p>
        </form>

        <SocialLogIn></SocialLogIn>
      </div>
    </div>
  );
};

export default Login;
