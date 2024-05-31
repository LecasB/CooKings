import React, { useState } from 'react';
import  supabase  from '../supabaseClient'; 

const EmailPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Password reset email sent!');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Enter your account's email</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleResetPassword}>Send</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailPasswordReset;
