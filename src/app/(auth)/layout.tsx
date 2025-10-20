import AuthComponent from "./_components/auth-component";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    redirect("/dashboard");
  }
  return <AuthComponent>{children}</AuthComponent>;
}
