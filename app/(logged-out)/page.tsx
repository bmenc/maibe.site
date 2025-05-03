"use client";
import { Button } from "@blueprintjs/core";
import Link from "next/link";
export default function LandingPage() {
  return (
    <section className="flex-group">
      <Link href="/login" className="flex-group">
        <Button text={"Log In"}/>
      </Link>
    </section>
  );
}
