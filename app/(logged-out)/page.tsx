"use client";
import { Button } from "@blueprintjs/core";
import Link from "next/link";
export default function LandingPage() {
  return (
    <section className="flex-group">
      <Link href="/demo/nav">
        <Button text="Nav" />
      </Link>
      <Link href="/demo/form">
        <Button text="Form" />
      </Link>
      <Link href="/demo/table">
        <Button text="Table" />
      </Link>
      
    </section>
  );
}
