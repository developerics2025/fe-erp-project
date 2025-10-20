import { cookies } from "next/headers";
import CheckEmail from "./_components/check-email";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Integrata ERP | Check Your Email",
};

export default async function Page() {
  const cookieStore = await cookies();
  const signupEmail = cookieStore.get("signup_email");

  if (!signupEmail) {
    redirect("/signin");
  }

  return <CheckEmail />;
}
