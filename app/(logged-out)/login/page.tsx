"use client";
import { Button, InputGroup } from "@blueprintjs/core";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        Login
      </h1>
      <form className="flex flex-col gap-4">
        <InputGroup placeholder="Email" type="email" />
        <InputGroup placeholder="Password" type="password" />
        <Button text="Login" intent="primary" type="submit" />
      </form>
      <p className="mt-4">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
}