import React, { useState, useEffect, useRef } from "react";
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
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const [tag, setTag] = useState([]);
  

  const fileInputRef = useRef();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setNewName(user.user_metadata?.username || "");
      setProfileImageURL(user.user_metadata?.profile_image_url || "");
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
    setProfileImage(null);
    
  };

  const uploadProfileImage = async () => {
    if (!profileImage) return null;

    try {
      const { data, error } = await supabase.storage
        .from("cooKingsBucket")
        .upload(profileImage.name, profileImage);

      if (error) throw error;

      return data.path;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setError(`Failed to upload profile image: ${error.message}`);
      return null;
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setMismatchError("");
  
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
      }
  
      const imagePath = await uploadProfileImage();
  
      const { error: updateMetadataError } = await supabase.auth.updateUser({
        data: {
          username: newName,
          profile_image_url: imagePath ? `https://bdoacldjlizmqmadvijc.supabase.co/storage/v1/object/public/cooKingsBucket/${profileImage.name}` : user.user_metadata?.profile_image_url || "",
          tags: tag, // Save the selected tags here
        },
      });
  
      if (updateMetadataError) {
        setError("Failed to update profile");
        setLoading(false);
        return;
      }
  
      setSuccess("Profile updated successfully");
      resetFields();
      setIsDirty(false);
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResetChanges = () => {
    resetFields();
    setIsDirty(false);
    setMismatchError("");

    // Only reset the profileImageURL if a new image has not been selected
    if (!isNewImageSelected) {
      setProfileImageURL(user?.user_metadata?.profile_image_url || "");
    }

    // Reset isNewImageSelected to false
    setIsNewImageSelected(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setProfileImageURL(URL.createObjectURL(file));
    setIsDirty(true);
    setIsNewImageSelected(true);
  };

  return (
    <div className="UserInfo">
      <section className="Perfil">
        <figure className="foto" onClick={handleImageClick}>
          {profileImageURL ? (
            <img src={profileImageURL} alt="Profile" className="profile-img" />
          ) : (
            <Profile className="profile-img" />
          )}
        </figure>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />

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
        <TagsArea tag={tag} setTag={setTag} setIsDirty={setIsDirty} />
        
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
