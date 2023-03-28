export const paths = {
  index: "/",
  auth: {
    index: "/auth",
    forgotPassword: "/auth/forgot",
    login: "/auth/login",
    register: "/auth/register",
    resetPassword: "/auth/reset-password",
    verifyCode: "/auth/verify-code",
  },
  dashboard: {
    index: "/dashboard",
    numbers: "/dashboard/numbers",
    importNumbers: "/dashboard/import-numbers",
    sendSMS: "/dashboard/send-sms",
    smsHistory: "/dashboard/sms-history",
    paymentMethod: "/dashboard/payment-method",
  },
  admin: {
    index: "/admin",
    clients: "/admin/clients",
    smsSummary: "/admin/sms-summary",
    paymentSummary: "/admin/payment-summary",
  },
  401: "/401",
  404: "/404",
  500: "/500",
};
