"use client";
import { Button } from "@blueprintjs/core";
import Link from "next/link";

export default function LoggedOutPage() {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Link href="/login">
          <Button text={"Log in"} />
        </Link>
        <Link href="/signup">
          <Button text={"Sign up"} />
        </Link>
      </div>
    </>
  );
}