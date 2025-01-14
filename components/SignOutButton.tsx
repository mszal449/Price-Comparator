"use client";
import { signOutAction } from "actions/users";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import toast from "react-hot-toast";

const SignOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickSignOutButton = async () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/");
        toast.success("Pomyślnie wylogowano.");
      }
    });
  };
  return (
    <button
      onClick={handleClickSignOutButton}
      className="login-button login-button-signup flex justify-center"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="animate-spin text-center" />
      ) : (
        "Wyloguj się"
      )}
    </button>
  );
};

export default SignOutButton;
