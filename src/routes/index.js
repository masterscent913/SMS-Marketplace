import { Outlet } from 'react-router-dom';
import { lazy } from 'react';
import { Layout as AuthLayout } from 'src/layouts/auth/index';
import Error401Page from 'src/pages/401';
import Error404Page from 'src/pages/404';
import Error500Page from 'src/pages/500';
import HomePage from 'src/pages';

const Login = lazy(() => import('src/pages/auth/login'));
const Register = lazy(() => import('src/pages/auth/register'));
const ForgotPassword = lazy(() => import('src/pages/auth/forgot'));
const ResetPassword = lazy(() => import('src/pages/auth/reset-password'));
const VerifyCode = lazy(() => import('src/pages/auth/verify-code'));

export const routes = [
  {
    element: (
      <Outlet />
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: 'login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    )
  },
  {
    path: 'register',
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    )
  },
  {
    path: 'reset-password',
    element: (
      <AuthLayout>
        <ResetPassword />
      </AuthLayout>
    )
  },
  {
    path: 'forgot',
    element: (
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    )
  },
  {
    path: 'verify-code',
    element: (
      <AuthLayout>
        <VerifyCode />
      </AuthLayout>
    )
  },
  {
    path: '401',
    element: <Error401Page />
  },
  {
    path: '404',
    element: <Error404Page />
  },
  {
    path: '500',
    element: <Error500Page />
  },
  {
    path: '*',
    element: <Error404Page />
  }
];
