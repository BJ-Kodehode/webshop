import React from 'react';
import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <SignIn />
    </div>
  );
};

export default LoginPage;
