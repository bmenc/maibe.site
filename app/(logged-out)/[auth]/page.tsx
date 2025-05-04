"use client";

import { usePathname } from "next/navigation";
import LoginPage from "./login";
import RegisterPage from "./register";

export default function AuthPage() {
  const pathname = usePathname();
  const auth = pathname ? pathname.split("/")[1] : "";

  if (auth === "login") {
    return <LoginPage/>;
  }

  if (auth === "register") {
    return <RegisterPage/>;
  }

  return <div>404 - Page Not Found</div>;
}
