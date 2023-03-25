import { Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Layout as AuthLayout } from "src/layouts/auth/index";
import { Layout as DashboardLayout } from "src/layouts/dashboard";

import Error401Page from "src/pages/401";
import Error404Page from "src/pages/404";
import Error500Page from "src/pages/500";
import HomePage from "src/pages";

const Login = lazy(() => import("src/pages/auth/login"));
const NumbersPage = lazy(() => import("src/pages/dashboard/numbers"));
const ImportNumbersPage = lazy(() =>
  import("src/pages/dashboard/importNumbers")
);
const DashboardPage = lazy(() => import("src/pages/dashboard"));
const PaymentMethodPage = lazy(() =>
  import("src/pages/dashboard/paymentMethod")
);
const SendSMSPage = lazy(() => import("src/pages/dashboard/sendSMS"));
const SMSHistoryPage = lazy(() => import("src/pages/dashboard/smsHistory"));

// const Register = lazy(() => import('src/pages/auth/register'));
// const ForgotPassword = lazy(() => import('src/pages/auth/forgot'));
// const ResetPassword = lazy(() => import('src/pages/auth/reset-password'));
// const VerifyCode = lazy(() => import('src/pages/auth/verify-code'));

export const routes = [
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "import-numbers",
        element: <ImportNumbersPage />,
      },
      {
        path: "numbers",
        element: <NumbersPage />,
      },
      {
        path: "send-sms",
        element: <SendSMSPage />,
      },
      {
        path: "sms-history",
        element: <SMSHistoryPage />,
      },
      {
        path: "payment-method",
        element: <PaymentMethodPage />,
      },
    ],
  },
  {
    path: "login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  // {
  //   path: 'register',
  //   element: (
  //     <AuthLayout>
  //       <Register />
  //     </AuthLayout>
  //   )
  // },
  // {
  //   path: 'reset-password',
  //   element: (
  //     <AuthLayout>
  //       <ResetPassword />
  //     </AuthLayout>
  //   )
  // },
  // {
  //   path: 'forgot',
  //   element: (
  //     <AuthLayout>
  //       <ForgotPassword />
  //     </AuthLayout>
  //   )
  // },
  // {
  //   path: 'verify-code',
  //   element: (
  //     <AuthLayout>
  //       <VerifyCode />
  //     </AuthLayout>
  //   )
  // },
  {
    path: "401",
    element: <Error401Page />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "500",
    element: <Error500Page />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
];
