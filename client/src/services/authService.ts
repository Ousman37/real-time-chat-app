// services/authService.ts
// services/authService.ts

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username); // Store the username locally
    return data; // Return the data for further use if needed
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username); // Store the username locally
    return data; // Return the data for further use if needed
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const getUsername = () => {
  return localStorage.getItem("username"); // Retrieve the stored username
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username"); // Clear the stored username
  window.location.reload(); // Optional: Refresh the page on logout
};

