// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div className="user-card" key={user.email}>
            <img src={`/${user.photo}`} alt={user.name} />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
