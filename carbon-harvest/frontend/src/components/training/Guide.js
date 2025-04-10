import React from 'react';

function UserGuide() {
  return (
    <div className="user-guide">
      <h2>User Guide</h2>
      <p>Welcome to our platform! Here's a quick guide to help you get started.</p>

      <h3>Getting Started</h3>
      <ul>
        <li>
          <strong>Step 1: Create an Account</strong>
          <p>Click on the "Register" button and fill in the required information.</p>
        </li>
        <li>
          <strong>Step 2: Login</strong>
          <p>Use your credentials to log in to the platform.</p>
        </li>
      </ul>

      <h3>Navigating the Dashboard</h3>
      <ul>
        <li>
          <strong>Dashboard Overview</strong>
          <p>Your dashboard gives you a snapshot of your account activity.</p>
        </li>
        <li>
          <strong>Profile</strong>
          <p>Update your profile information in the profile section.</p>
        </li>
      </ul>
    </div>
  );
}

export default UserGuide;