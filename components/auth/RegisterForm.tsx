"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [repeatPasswordError, setRepeatPasswordError] =
    React.useState<string>("");

  const router = useRouter();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let emptyLogin = false;
    let emptyPassword = false;
    let emptyRepeatPassword = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      emptyLogin = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Nieprawidłowy format email");
      return;
    }

    if (password === "") {
      emptyPassword = true;
    }
    if (repeatPassword === "") {
      emptyRepeatPassword = true;
    }

    if (emptyLogin) {
      setEmailError("Pole nie może być puste");
    } else {
      setEmailError("");
    }
    if (emptyPassword) {
      setPasswordError("Pole nie może być puste");
    } else {
      setPasswordError("");
    }
    if (emptyRepeatPassword) {
      setRepeatPasswordError("Pole nie może być puste");
    } else {
      setRepeatPasswordError("");
    }

    if (emptyLogin || emptyPassword || emptyRepeatPassword) {
      return;
    }

    try {
      const doesUserExist = await fetch("/api/auth/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const { user } = await doesUserExist.json();

      if (user) {
        setEmailError("Użytkownik o podanym emailu już istnieje");
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          repeatPassword,
        }),
      });

      if (res.ok) {
        console.log("Success");
        const data = await res.json();
        console.log(data);
      }
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      const resLogin = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (resLogin?.error) {
        setPasswordError("Niepoprawne dane logowania");
        return;
      }

      router.push("/raport");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text flex flex-col items-center pt-10">
      <div className="pb-5 text-2xl">Rejestracja</div>
      <form className="" action="#" onSubmit={submitForm}>
        <div className="pb-5">
          <h1 className="ml-1">Email</h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`rouned-sm border border-gray-800 bg-black p-1 ${emailError !== "" ? "border-red-500" : ""}`}
          />
          {emailError && <div className="text-red-500">{emailError}</div>}
        </div>
        <div className="pb-5">
          <h1 className="ml-1">Hasło</h1>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Hasło"
            className={`rouned-md border border-gray-800 bg-black p-1 ${passwordError !== "" ? "border-red-500" : ""}`}
          />
          {passwordError && <div className="text-red-500">{passwordError}</div>}
        </div>
        <div className="pb-5">
          <h1 className="ml-1">Powtórz hasło</h1>
          <input
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            placeholder="Hasło"
            className={`rouned-md border border-gray-800 bg-black p-1 ${passwordError !== "" ? "border-red-500" : ""}`}
          />
          {passwordError && (
            <div className="text-red-500">{repeatPasswordError}</div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="mx-auto mb-4 rounded-md bg-purple-600 p-2 duration-150 ease-in hover:bg-purple-700"
          >
            Zarejestruj się
          </button>
          <Link href="/" className="text-sm hover:underline">
            Zapomniałem hasła
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
