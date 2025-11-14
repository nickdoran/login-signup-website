import Link from "next/link";

const Signup = () => {
    return (
        <Link
            href={"/signup"}
            className="px-2 py-1 text-[#1a1a1a] bg-[#dfdfdf] rounded-xl text-md font-semibold"
        >
            Sign Up
        </Link>
    );
};

export default Signup;
