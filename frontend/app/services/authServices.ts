const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
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
