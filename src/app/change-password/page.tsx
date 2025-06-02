'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from '../../utils/axios'; 

type FormData = {
  userName: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ErrorData = Partial<Record<keyof FormData | 'global', string>>;

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ErrorData>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: ErrorData = {};
    if (!formData.userName) newErrors.userName = 'Username is required';
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.put('/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      setSuccess(true);
      setFormData({
        userName: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setErrors({});
    } catch (err: any) {
      setErrors({ global: err.response?.data?.message || 'Password change failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🔐 Change Password</h1>

        {loading && <p className="text-blue-500 text-center mb-4">Updating password...</p>}
        {success && <p className="text-green-600 text-center mb-4">✅ Password updated successfully!</p>}
        {errors.global && <p className="text-red-500 text-center mb-4">❌ {errors.global}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {(['userName', 'currentPassword', 'newPassword', 'confirmPassword'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {field === 'userName' ? 'Username' : field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={
                  field === 'userName'
                    ? 'Enter your username'
                    : field === 'currentPassword'
                    ? 'Current password'
                    : field === 'newPassword'
                    ? 'New password'
                    : 'Confirm password'
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
              />
              {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 ease-in-out shadow-md disabled:opacity-60"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChangePasswordPage;