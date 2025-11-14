"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface AuthFormProps {
    mode: string;
}

const AuthForm = ({ mode }: AuthFormProps) => {
    const isLogin = mode === "login";
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        if (emailTouched && value && !validateEmail(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handleEmailBlur = () => {
        setEmailTouched(true);
        if (email && !validateEmail(email)) {
            setEmailError("Please enter a valid email address");
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate email one more time on submit
        if (email && !validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            setEmailTouched(true);
            return;
        }

        // Prepare data to send to backend
        const formData = {
            ...(isLogin ? {} : { name }), // Only include name for signup
            email,
            password,
        };

        console.log("Submitting to backend:", formData);

        // TODO: Send to your backend API
        router.push("/");
    };

    return (
        <div className="max-w-xl w-full bg-[#1d1d1d] p-8 fadeInMoveUp">
            <Link className=" flex text-sm items-center" href="/">
                <ChevronLeft size={17} className="text-[#999]"></ChevronLeft>
                <p className="text-[#999]">Back Home</p>
            </Link>
            <h1 className="text-3xl mb-6">
                {isLogin
                    ? "Log into your account"
                    : "Sign up for a new account"}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-7 items-start mb-10"
            >
                {!isLogin && (
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">First Name:</label>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your first name..."
                            required
                        ></input>
                    </div>
                )}
                <div className="flex flex-col gap-1 w-full relative">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        className={
                            emailError
                                ? "border border-red-500"
                                : "border border-transparent"
                        }
                        required
                    ></input>
                    {emailError && (
                        <p className=" absolute -bottom-5 text-red-500 text-xs mt-1">
                            {emailError}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1 items-start">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4"
                        placeholder="Enter your password..."
                        required
                    ></input>
                    <button
                        type="submit"
                        className="cursor-pointer bg-[#3a3a3a] px-3 py-1 rounded-sm"
                    >
                        {isLogin ? "Login" : "Signup"}
                    </button>
                </div>
            </form>
            <p className=" text-sm text-[#999] underline">
                {isLogin ? (
                    <Link href="/signup">Already have an account?</Link>
                ) : (
                    <Link href="/login">{"Don't have an account yet?"}</Link>
                )}{" "}
            </p>
        </div>
    );
};

export default AuthForm;
