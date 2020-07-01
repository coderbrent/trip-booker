import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <a 
      className={ isAuthenticated ? 'button is-danger' : 'button is-success' }
      onClick={ isAuthenticated ? () => logout() : () => loginWithRedirect() }
    >
      { isAuthenticated ? 'Log out' : 'Log in' }
    </a>
  )
};

export default LoginButton;
