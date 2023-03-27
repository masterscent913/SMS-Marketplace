import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const IndexPage = lazy(() => import('src/pages/dashboard/index'));

const NumbersPage = lazy(() => import('src/pages/dashboard/numbers'))
const ImportNumbersPage = lazy(() =>
  import('src/pages/dashboard/importNumbers')
)
const DashboardPage = lazy(() => import('src/pages/dashboard'))
const PaymentMethodPage = lazy(() =>
  import('src/pages/dashboard/paymentMethod')
)
const SendSMSPage = lazy(() => import('src/pages/dashboard/sendSMS'))
const SMSHistoryPage = lazy(() => import('src/pages/dashboard/smsHistory'))

export const dashboardRoutes = [
  {
    path: 'dashboard',
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
        element: <DashboardPage />
      },
      {
        path: 'import-numbers',
        element: <ImportNumbersPage />
      },
      {
        path: 'numbers',
        element: <NumbersPage />
      },
      {
        path: 'send-sms',
        element: <SendSMSPage />
      },
      {
        path: 'sms-history',
        element: <SMSHistoryPage />
      },
      {
        path: 'payment-method',
        element: <PaymentMethodPage />
      }
    ]
  },
];
