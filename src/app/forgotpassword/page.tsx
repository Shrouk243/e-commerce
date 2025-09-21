

"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ForgotType } from "@/types/forgot.type";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      let data: ForgotType = {};
      try {
        data = await res.json();
      } catch {
        data = { message: "No JSON returned from API" };
      }


      if (res.ok && data.statusMsg === "success") {
        toast.success(" OTP sent to your email");
        router.push("/verifyreset"); 
      } else {
        toast.error(data.message || " Error sending email");
      }
    } catch {
      toast.error("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/3 mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
        required
      />
      <Button
        type="submit"
        disabled={loading}
        className=" text-white bg-green-600 hover:bg-green-800 px-4 py-2 rounded "
      >
        {loading ? "Sending..." : "Send Code"}
      </Button>
    </form>
  );
}
