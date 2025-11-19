const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response
                .json()
                .catch(() => ({ detail: "Login failed" }));
            throw new Error(error.detail || "Login failed");
        }

        return response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const signup = async (name: string, email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const error = await response
                .json()
                .catch(() => ({ detail: "Signup failed" }));
            throw new Error(error.detail || "Signup failed");
        }

        return response.json();
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
};

export const getMe = async () => {
    try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!response.ok) {
            const error = await response
                .json()
                .catch(() => ({ detail: "Could not fetch users data" }));
            throw new Error(error.detail || "Could not fetch users data");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Could not fetch users name", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        return response.json();
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};
