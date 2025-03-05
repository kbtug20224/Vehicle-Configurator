const API_BASE_URL = "http://localhost:8080";  

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // ✅ Allows cookies to be stored
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.error || "Login failed!");
        }

        return await response.json(); // No need to check for token, cookie stores it
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error(error.message || "Login failed. Please try again.");
    }
};
