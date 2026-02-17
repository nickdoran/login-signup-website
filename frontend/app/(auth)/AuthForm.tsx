"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { login, signup } from "../services/authServices";
import { toast } from "sonner";
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
        setError("");

        // Validate email one more time on submit
        if (email && !validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            setEmailTouched(true);
            return;
        }

        setIsLoading(true);

        try {
            if (isLogin) {
                // Call login API
                const response = await login(email, password);
                console.log("Login successful:", response);
                toast("Log In Successful!", {
                    style: {
                        background: "green",
                        color: "white",
                        border: "3px solid #1d1d1d",
                    },
                });
                router.push("/");
            } else {
                // Call signup API
                const response = await signup(name, email, password);
                console.log("Signup successful:", response);
                toast("Sign Up Successful!", {
                    style: {
                        background: "green",
                        color: "white",
                        border: "3px solid #1d1d1d",
                    },
                });
                router.push("/");
            }
        } catch (error) {
            console.log("could not fetch:", error);

            // Extract error message
            const errorMessage = error instanceof Error ? error.message : "An error occurred";

            // Show specific toast based on error type
            if (errorMessage.includes("Email already registered")) {
                toast("This email is already registered!", {
                    style: {
                        background: "red",
                        color: "white",
                        border: "3px solid #1d1d1d",
                    },
                });
            } else if (errorMessage.includes("Invalid email or password")) {
                toast("Invalid Email or Password!", {
                    style: {
                        background: "red",
                        color: "white",
                        border: "3px solid #1d1d1d",
                    },
                });
            } else {
                toast(errorMessage, {
                    style: {
                        background: "red",
                        color: "white",
                        border: "3px solid #1d1d1d",
                    },
                });
            }
        } finally {
            setIsLoading(false);
        }
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

            {error && (
                <div className="w-full bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

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
