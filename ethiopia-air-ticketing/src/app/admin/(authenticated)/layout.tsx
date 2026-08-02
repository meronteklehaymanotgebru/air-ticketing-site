import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { Toaster } from "react-hot-toast";

export default async function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminLayoutWrapper user={session as any}>
        {children}
      </AdminLayoutWrapper>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #f1f5f9',
            padding: '16px',
            color: '#1e293b',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            borderRadius: '1rem',
            fontWeight: '600',
            fontSize: '14px',
          },
          success: {
            style: {
              background: '#f0fdf4',
              borderColor: '#bbf7d0',
              color: '#166534',
            },
            iconTheme: {
              primary: '#22c55e',
              secondary: '#f0fdf4',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              borderColor: '#fecaca',
              color: '#991b1b',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fef2f2',
            },
          },
        }}
      />
    </>
  );
}
