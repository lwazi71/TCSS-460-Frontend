import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.userName) newErrors.userName = 'Username is required';
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Stub: API call disabled for this sprint
    console.log("Form validated. Stub for future API call:");
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.userName && <p className="text-red-500">{errors.userName}</p>}

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.currentPassword && <p className="text-red-500">{errors.currentPassword}</p>}

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;