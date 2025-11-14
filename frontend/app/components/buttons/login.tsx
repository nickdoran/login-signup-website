"use client";
import Link from "next/link";

const Login = () => {
    return (
        <Link
            href={"/login"}
            className="px-2 py-1 text-[#939393] rounded-xl text-md font-semibold"
        >
            Log In
        </Link>
    );
};

export default Login;
