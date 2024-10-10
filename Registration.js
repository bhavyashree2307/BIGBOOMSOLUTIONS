// Registration.js
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('photo', photo);

    try {
      const response = await axios.post('/api/register', formData);
      // Handle successful registration
      console.log('Registration successful', response.data);
    } catch (error) {
      setErrorMessage('Registration failed.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required />
        </div>
        <button type="submit">Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Registration;
