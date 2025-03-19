"use client";

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyMembership = async () => {
            if (isAuthenticated && user?.email) {
                try {
                    const response = await fetch('/api/verify-membership', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: user.email }),
                    });

                    const data = await response.json();

                    if (data.isMember) {
                        navigate('/dashboard');
                    } else {
                        window.location.href = data.redirect;
                    }
                } catch (error) {
                    console.error('Error verifying membership:', error);
                }
            }
        };

        if (!isLoading && isAuthenticated) {
            verifyMembership();
        }
    }, [isAuthenticated, isLoading, navigate, user]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        You must be a registered club member to access resources
                    </p>
                </div>
                <div>
                    <button
                        onClick={() => loginWithRedirect()}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in with Auth0
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;