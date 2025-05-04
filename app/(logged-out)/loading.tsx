"use client";
import { Spinner } from "@blueprintjs/core";
export default function Loading() {
  return (
    <section className="flex-group">
        <Spinner size={25} />
    </section>
  );
}
