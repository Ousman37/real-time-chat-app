import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../services/authService";

const Profile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch user profile data and populate the fields
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
        // Set profile picture if available
        setProfilePicture(data.profilePicture);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await fetch("http://localhost:5001/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Profile update failed");
      }

      setSuccess("Profile updated successfully");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Profile update failed");
      }
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="profile-container">
      <h2>Update Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleProfilePictureChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
