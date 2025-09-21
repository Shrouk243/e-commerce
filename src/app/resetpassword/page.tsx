
"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await res.json();
      console.log("Reset Password Response:", data);

      if (data.token) {
        toast.success("✅ Password reset successfully! Please login with your new password.");
        router.push("/login"); // يوديك على صفحة اللوجين
      } else {
        toast.error(data.message || "❌ Failed to reset password");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("⚠️ Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/3 mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
        required
      />

      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
        required
      />

      <Button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
