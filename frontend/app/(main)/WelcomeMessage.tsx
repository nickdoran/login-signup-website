"use client";

import { useEffect, useState } from "react";
import { getMe } from "../services/authServices";
import { User } from "../types/user";

const WelcomeMessage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await getMe();
                setUser(data);
            } catch (error) {
                console.error("Could not fetch user's data", error);
            } finally {
                setLoading(false);
            }
        };
        getUserData();
    }, []);

    if (loading) {
        return <p className="text-7xl font-bold fadeInMoveUp">Loading...</p>;
    }

    return (
        <p className="text-7xl font-bold fadeInMoveUp">
            Hello, {user?.name || "Guest"}
        </p>
    );
};

export default WelcomeMessage;
