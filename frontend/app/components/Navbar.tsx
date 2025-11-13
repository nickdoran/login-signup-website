import React from "react";
import Login from "./buttons/Login";
const Navbar = () => {
    return (
        <div
            className="w-full h-15 bg-[#181818] px-20 py-2.5 flex items-center justify-between  
    "
        >
            <p className="text-white font-bold text-2xl">Navbar</p>
            <div>
                <Login></Login>
            </div>
        </div>
    );
};

export default Navbar;
