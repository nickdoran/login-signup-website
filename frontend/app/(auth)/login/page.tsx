import React from "react";
import AuthForm from "../AuthForm";
const Login = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <AuthForm mode="login"></AuthForm>
        </div>
    );
};

export default Login;
