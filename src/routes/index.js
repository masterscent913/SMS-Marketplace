import { Outlet } from 'react-router-dom';
import { lazy } from 'react';
import { Layout as AuthLayout } from 'src/layouts/auth/index';

const Login = lazy(() => import('src/pages/auth/login'));

export const routes = [
  {
    path: 'login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    )
  }
];
