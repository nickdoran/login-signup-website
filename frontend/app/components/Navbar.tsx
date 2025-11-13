import React from "react";
import Login from "./buttons/Login";
import Signup from "./buttons/Signup";
const Navbar = () => {
    return (
        <div
            className="w-full h-17 bg-[#1d1d1d] px-40 py-2.5 flex items-center justify-between  
    "
        >
            <p className="text-white font-bold text-2xl">Navbar</p>
            <div
                className="flex gap-3
            "
            >
                <Login></Login>
                <Signup></Signup>
            </div>
        </div>
    );
};

export default Navbar;
