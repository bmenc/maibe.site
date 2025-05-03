"use client";

import { usePathname } from "next/navigation";
import LoginPage from "./login";

export default function AuthPage() {
  const pathname = usePathname();
  const auth = pathname.split("/")[1];

  if (auth === "login") {
    return <LoginPage/>;
  }

  if (auth === "register") {
    return <div>Register Page</div>;
  }

  return <div>404 - Page Not Found</div>;
}
