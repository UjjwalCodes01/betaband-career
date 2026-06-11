import { cookies } from "next/headers";
import AdminDashboard from "./AdminDashboard";
import { LoginForm } from "./LoginForm";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "authenticated";

  if (!isAdmin) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
