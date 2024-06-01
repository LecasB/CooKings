import React, { useState, useEffect } from "react";
import "../../estilos/UserLateral.css";
import { Profile } from "../../imagens/svgs";
import supabase from "../../supabaseClient";
import TagsArea from "../TagsArea";

const UserInfo = () => {
  const [ops, setOps] = useState([]);
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mismatchError, setMismatchError] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [newName, setNewName] = useState("");

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setNewName(user.user_metadata?.username || "");
    } else {
      setUser(null);
    }
  };

  const getCategories = async () => {
    try {
      const { data: fetchedData, error } = await supabase.from("Tags").select();
      if (error) throw error;
      setOps(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getUser();
  }, []);

  const resetFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setName("");
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setMismatchError(""); // Reset mismatch error

    if (newPassword && newPassword !== confirmNewPassword) {
      setMismatchError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      if (currentPassword && newPassword) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: user?.email,
          password: currentPassword,
        });

        if (signInError) {
          setError("Current password is incorrect");
          setLoading(false);
          return;
        }

        const { error: updatePasswordError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updatePasswordError) {
          setError("Failed to update password");
          setLoading(false);
          return;
        }

        resetFields(); // Reset fields after successful password change
      }

      const { error: updateMetadataError } = await supabase.auth.updateUser({
        data: { username: newName },
      });

      if (updateMetadataError) {
        setError("Failed to update name");
        setLoading(false);
        return;
      }

      setSuccess("Profile updated successfully");
      setIsDirty(false);
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResetChanges = () => {
    resetFields(); // Reset fields
    setIsDirty(false);
    setMismatchError(""); // Reset mismatch error
  };

  return (
    <div className="UserInfo">
      <section className="Perfil">
        <figure className="foto">
          <Profile />
        </figure>

        <input
          className="inputsProfile"
          type="text"
          name="Nome"
          id=""
          placeholder="Name"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setIsDirty(true);
          }}
        />

        <input
          className="inputsProfile"
          type="email"
          name="Email"
          id=""
          placeholder="Email"
          readOnly
          value={user?.user_metadata?.email || ""}
        />

        <input
          className="inputsProfile"
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            setIsDirty(true);
          }}
        />

        <input
          className="inputsProfile"
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setIsDirty(true);
          }}
        />

        <input
          className="inputsProfile"
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);
            setIsDirty(true);
          }}
        />
        {mismatchError && <p className="error-message">{mismatchError}</p>}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <TagsArea />
        {isDirty && (
          <div className="button-group">
            <button
              className="saveProfileUpdate"
              onClick={handleSaveChanges}
              disabled={loading}
            >
              {loading ? "Updating..." : "Save"}
            </button>
            <button
              className="resetProfileUpdate"
              onClick={handleResetChanges}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserInfo;
