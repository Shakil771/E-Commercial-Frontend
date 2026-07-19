import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';


import { verifyEmail } from '../authSlice';
import Spinner from '../../../components/common/Spinner';
import Button from '../../../components/common/Button';

const VerifyEmailPage = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('No verification token provided.');
        return;
      }

      try {
        const response = await dispatch(verifyEmail(token)).unwrap();

        setStatus('success');
        setMessage(
          response?.message || 'Your email has been verified successfully.'
        );
      } catch (error) {
        setStatus('error');
        setMessage(
          typeof error === 'string'
            ? error
            : error?.message || 'Verification link is invalid or has expired.'
        );
      }
    };

    verify();
  }, [dispatch, token]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">

        {status === 'verifying' && (
          <>
            <Spinner size="lg" className="mx-auto" />
            <h2 className="mt-6 text-2xl font-bold">
              Verifying Email
            </h2>
            <p className="mt-2 text-gray-500">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <HiCheckCircle className="mx-auto h-20 w-20 text-green-500" />

            <h2 className="mt-6 text-2xl font-bold text-green-600">
              Email Verified!
            </h2>

            <p className="mt-3 text-gray-600">
              {message}
            </p>

            <Link to={"/login"}>
              <Button className="mt-8 w-full">
                Go to Login
              </Button>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <HiXCircle className="mx-auto h-20 w-20 text-red-500" />

            <h2 className="mt-6 text-2xl font-bold text-red-600">
              Verification Failed
            </h2>

            <p className="mt-3 text-gray-600">
              {message}
            </p>

            <Link to={"/login"}>
              <Button
                variant="outline"
                className="mt-8 w-full"
              >
                Back to Login
              </Button>
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmailPage;