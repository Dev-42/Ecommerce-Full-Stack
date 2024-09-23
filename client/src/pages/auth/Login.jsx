import { Link } from "react-router-dom";
import LoginForm from "../../components/common/LoginForm";
// import { useState } from "react";

const Login = () => {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Do not have an account?&nbsp;
          <Link className="font-medium text-primary" to={"/auth/register"}>
            Register
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
