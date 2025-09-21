
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { cachSchema, cachSchemaType } from "@/Schema/cach.schema";
import onlineCach from "@/cachactions/cach.action";

export default function Cach() {
  const { id } = useParams<{ id: string }>(); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [success, setSuccess] = useState<string | null>(null); 




  const form = useForm<cachSchemaType>({
    resolver: zodResolver(cachSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function handleCach(values: cachSchemaType) {
    setIsLoading(true); 
    setError(null); 
    setSuccess(null); 

    try {
      const res = await onlineCach(id); 

      if (res.status === "success") {
        form.reset();
        
        const totalPrice = res.data?.totalOrderPrice?.toFixed(2) || "0.00"; 
        setSuccess(`Payment completed successfully! Total Price: ${totalPrice}`);
      } else {
        setError(`Payment failed with status: ${res.status}`);
      }
    } catch (err) {
      console.error("Error in handleCach:", err);
      setError("An error occurred during payment. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-center text-3xl font-bold my-4">Cash Now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCach)} className="space-y-4">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {success && <p className="text-green-500 text-sm">{success}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
}