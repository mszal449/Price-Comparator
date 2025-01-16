"use client";
import { createAccountAction } from "actions/users";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickCreateAccount = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await createAccountAction(formData);

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/auth/login");
        toast.success(
          "Link weryfikacyjny został wysłany na podany adres email.",
        );
      }
    });
  };

  return (
    <form className="login-form">
      <div className="mb-4">
        <div className="pb-4 text-center text-3xl">Rejestracja</div>
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="login-input"
          disabled={isPending}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="login-label">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="login-input"
          disabled={isPending}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="registration_key" className="login-label">
          Klucz Rejestracji
        </label>
        <input
          id="registration_key"
          name="registration_key"
          type="password"
          required
          className="login-input"
          disabled={isPending}
        />
      </div>
      <button
        formAction={handleClickCreateAccount}
        className="login-button login-button-signup flex justify-center"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="animate-spin text-center" />
        ) : (
          "Utwórz Konto"
        )}
      </button>
    </form>
  );
}
