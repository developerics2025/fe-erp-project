"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ActivateAccountView } from "./activate-account-view";
import { useActivateAccount } from "./useActivateAccount";

interface Props {
  token: string;
}

const ActivateAccountClient: React.FC<Props> = ({ token }) => {
  const router = useRouter();

  const { state } = useActivateAccount(token);

  return <ActivateAccountView state={state} onNavigate={router.replace} />;
};

export default ActivateAccountClient;
