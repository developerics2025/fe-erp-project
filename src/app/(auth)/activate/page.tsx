import { redirect } from "next/navigation";
import ActivateAccountClient from "./_components/activate-account-client";

export const metadata = {
  title: "Integrata ERP | Account Activation",
};

export default async function ActivatePage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    redirect("/signin");
  }

  return <ActivateAccountClient token={token} />;
}
