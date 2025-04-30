"use client";
import { Button, InputGroup } from "@blueprintjs/core";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        Admin Signup
      </h1>
      <form className="flex flex-col gap-4">
        <InputGroup placeholder="Email" type="email" />
        <InputGroup placeholder="Password" type="password" />
        <InputGroup placeholder="Confirm Password" type="password" />
        <Button text="Sign Up" intent="primary" type="submit" />
      </form>
      <p className="mt-4">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </>
  );
}