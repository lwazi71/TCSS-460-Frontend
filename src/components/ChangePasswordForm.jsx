import { useState } from 'react';


const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.userName) newErrors.userName = 'Username is required';
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('https://group8-tcss460-web-api-57308080b655.herokuapp.com/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });
      const text = await response.text();
      console.log('Response Text:', text); // <-- Log response body
      if (!response.ok) throw new Error(`API Error ${response.status}: ${text}`);

      const data = JSON.parse(text); // only parse if it's valid
      if (!response.ok) throw new Error(data.message || 'Password change failed');

      setSuccess(true);
      setFormData({
        userName: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setErrors({});
    } catch (err) {
      setErrors({ global: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        {loading && <p className="text-blue-500">Updating password...</p>}
        {success && <p className="text-green-600">Password updated successfully!</p>}
        {errors.global && <p className="text-sm text-red-500">{errors.global}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {['userName', 'currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">
                {field === 'userName' ? 'Username' : field.replace(/([A-Z])/g, ' $1')}
                <input
                  type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>
              {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
