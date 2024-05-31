import React, { useState } from 'react';
import  supabase  from '../supabaseClient'; // Adjust the import according to your setup

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const { error } = await supabase.auth.updateUser({
          password: password,
        });
        if (error) {
          alert('Error updating password: ' + error.message);
        } else {
          // Redirect to another page after successful password reset
          
        }
      } catch (error) {
        console.error('Error updating password', error);
        alert('Error updating password: ' + error.message);
      }
    } else {
      alert('Passwords do not match. Please try again.');
    }
  };

  return (
    <div>
      <h1>Enter Your New Password</h1>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <h1>Confirm Your New Password</h1>
      <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default PasswordReset;
