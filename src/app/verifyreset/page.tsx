"use client"
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function VerifyResetPage() {
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      });

      const data = await res.json();
      console.log("Verify Code:", data);

      if (data.status === "Success") {
        toast.success("Code verified");
        router.push("/resetpassword"); // ✅ روح لصفحة تغيير الباسورد
      } else {
        toast.error(data.message || "Invalid code");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/3 mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Reset Code</h1>
      <input
        type="text"
        placeholder="Enter reset code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
        required
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
      >
        {loading ? "Verifying..." : "Verify Code"}
      </Button>
    </form>
  );
}
