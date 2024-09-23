import { Link } from "react-router-dom";
import RegisterForm from "../../components/common/RegisterForm";
// import { useState } from "react";

const Register = () => {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account&nbsp;
          <Link className="font-medium text-primary" to={"/auth/login"}>
            Login
          </Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
