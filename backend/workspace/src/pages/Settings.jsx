import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import Alert from '../components/ui/Alert';

function Settings() {
  const [username, setUsername] = useState('petowner123');
  const [email, setEmail] = useState('petowner@example.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [alert, setAlert] = useState(null);

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Saving profile:', { username, email });
    setAlert({ type: 'success', message: 'Profile updated successfully!' });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }
    // Simulate API call for password change
    console.log('Changing password:', { oldPassword, newPassword });
    setAlert({ type: 'success', message: 'Password changed successfully!' });
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    setAlert({ type: 'info', message: `Notifications ${notificationsEnabled ? 'disabled' : 'enabled'}.` });
  };

  return (
    <div className="container">
      <Breadcrumbs />
      <h1>Settings</h1>

      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <section className="card p-4 mb-4">
        <h2>Profile Information</h2>
        <form onSubmit={handleProfileSave}>
          <Input
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="primary">
            Save Profile
          </Button>
        </form>
      </section>

      <section className="card p-4 mb-4">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <Input
            label="Old Password"
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <Input
            label="New Password"
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary">
            Change Password
          </Button>
        </form>
      </section>

      <section className="card p-4 mb-4">
        <h2>Notification Preferences</h2>
        <Checkbox
          label="Enable Notifications"
          id="notificationsEnabled"
          checked={notificationsEnabled}
          onChange={handleNotificationToggle}
        />
      </section>
    </div>
  );
}

export default Settings;
