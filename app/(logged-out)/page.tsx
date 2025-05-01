"use client";

import { Button } from "@blueprintjs/core";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function LandingPage() {
  const buttons = useSelector((state: RootState) => state.buttons);

  return (
    <section className="flex-group">
      {buttons.map((item, index) => (
        <Link key={index} href={`/${item.route}`}>
          <Button text={item.text} />
        </Link>
      ))}
    </section>
  );
}
