import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { register as registerUser, clearAuthError } from '../authSlice.js';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for password visibility

  const { status } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (formData) => {
    dispatch(clearAuthError());

    const { confirmPassword, ...payload } = formData;

    const result = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(result)) {
      setRegisteredEmail(result.payload.data.email);
      setShowVerifyModal(true);
    } else {
      showError(result.payload || 'Registration failed');
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-1 text-sm text-gray-500">Join us and start shopping today</p>
        </div>

        <Input
          label="Full name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name is too short' } })}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
        />


        <div className='relative'>
          <Input
            className="w-full py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" // Add padding for the eye icon
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
            placeholder="At least 8 characters"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              validate: {
                hasNumber: (v) => /\d/.test(v) || 'Must contain at least one number',
                hasLetter: (v) => /[A-Za-z]/.test(v) || 'Must contain at least one letter',
              },
            })}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:font-bold pt-6"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} {/* Eye icon */}
          </button>
        </div>


        <div className='relative'>
          <Input
            label="Confirm password"
            className="w-full py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" // Add padding for the eye icon
            type={showConfirmPassword ? "text" : "password"} // Toggle type based on showPassword state
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}

          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showPassword state
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:font-bold pt-6"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"
            }          >
            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} {/* Eye icon */}
          </button>
        </div>

        <Button type="submit" className="w-full" isLoading={status === 'loading'}>
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-gray-900 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <span className="text-4xl">📧</span>
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold">
              Verify Your Email
            </h2>

            <p className="mt-4 text-center text-gray-600">
              Your account has been created successfully.
            </p>

            <p className="mt-4 text-center text-gray-700">
              We've sent a verification email to
            </p>

            <p className="mt-2 break-all text-center font-semibold text-blue-600">
              {registeredEmail}
            </p>

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
              <ul className="space-y-2">
                <li>✓ Open your email inbox.</li>
                <li>✓ Click the verification link.</li>
                <li>✓ After verification, you can sign in.</li>
                <li>✓ Check your Spam folder if you don't see the email.</li>
              </ul>
            </div>

            <Button
              type="button"
              className="mt-8 w-full"
              onClick={() => {
                setShowVerifyModal(false);
                navigate('/login', { replace: true });
              }}
            >
              Go Back to Login
            </Button>

          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
