import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardLayout from "src/layouts/admin";

const IndexPage = lazy(() => import("src/pages/dashboard/index"));

const NumbersPage = lazy(() => import("src/pages/dashboard/numbers"));
const ClientsPage = lazy(() => import("src/pages/admin/clients"));
const AdminPage = lazy(() => import("src/pages/admin"));

export const adminRoutes = [
  {
    path: "admin",
    element: (
      <AdminDashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </AdminDashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "clients",
        element: <ClientsPage />,
      },
      {
        path: "sms-summary",
        element: <ClientsPage />,
      },
      {
        path: "payment-summary",
        element: <ClientsPage />,
      },
    ],
  },
];
