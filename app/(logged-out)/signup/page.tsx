"use client";
import { useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    axios.post("/api/auth/signup", formData)
      .then((response) => {
        console.log("Signup successful:", response.data);
      })
      .catch((error) => {
        console.error("Signup error:", error.response?.data || error.message);
      });
  };

  return (
    <>
      <h1 className="flex gap-2 items-center">
        Signup
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputGroup
          placeholder="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputGroup
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputGroup
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputGroup
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button text="Sign Up" intent="primary" type="submit" />
      </form>
      <p className="mt-4">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </>
  );
}